"use server"

import authOptions from "@/app/api/auth/[...nextauth]/authOptions";
import prisma from '@/lib/prisma';
import { subWeeks } from "date-fns";
import { promises as fs } from "fs";
import { getServerSession } from "next-auth/next";
import { join } from "path";
const bcrypt = require('bcrypt');


export async function postTherapist(data) {
    try {
        const hashedPassword = await bcrypt.hash(data.password, 10);
        const therapist = await prisma.therapist.create({
            data: {
                name: data.name,
                mail: data.mail,
                tel: data.tel,
                password: hashedPassword
            }
        });
        return therapist;
    } catch (err) {
        console.dir(err)
    }
}

export async function postUser(data) {
    try {
        const hashedPassword = await bcrypt.hash(data.password, 10);
        const user = await prisma.user.create({
            data: {
                name: data.name,
                mail: data.mail,
                tel: data.tel,
                password: hashedPassword
            }
        });
        return user;
    } catch (err) {
        console.dir(err)
    }
}
export async function putUser(formData) {
    const session = await getServerSession(authOptions);
    if (!(session?.user?.role == "user")) return;
    try {
        const name = formData.get("name");
        const genderId = parseInt(formData.get("genderId"));
        const mail = formData.get("mail");
        const tel = formData.get("tel");
        const imageFile = formData.get("imageFileName");
        const zipcode = formData.get("zipcode")
        const prefectureId = parseInt(formData.get("prefectureId"))
        const city = formData.get("city")
        const address = formData.get("address")

        if (imageFile?.arrayBuffer) {
            const fileName = imageFile.name;
            const arrayBuffer = await imageFile.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);

            // 保存先のパスを指定
            const uploadDir = join(process.cwd(), "public", "userImg", session.user.id.toString());
            await fs.mkdir(uploadDir, { recursive: true });
            const filePath = join(uploadDir, fileName);
            // ファイルをサーバー上に保存
            await fs.writeFile(filePath, buffer);

        }

        const user = await prisma.user.update({
            where: { id: session.user.id },
            data: {
                name,
                genderId,
                mail,
                tel,
                imageFileName: imageFile.name,
                zipcode,
                prefectureId,
                city,
                address
            }
        });
        return user;
    } catch (err) {
        console.dir(err)
    }
}

export async function getUser() {
    const session = await getServerSession(authOptions);
    if (!(session?.user?.role == "user")) {
        return;
    }
    try {
        const user = await prisma.user.findFirst({
            where: {
                id: session.user.id
            }
        });
        return user;
    } catch (err) {
        console.dir(err);
    }

}

export async function getStatuses() {
    const statuses = await prisma.status.findMany({})
    return statuses;
}
export async function getPrefectures() {
    const prefectures = await prisma.prefecture.findMany({ orderBy: { id: "asc" } });
    return prefectures;
}

export async function getGenders() {
    const genders = await prisma.gender.findMany({ orderBy: { id: "asc" } });
    return genders;
}

export async function getMenus() {
    const menus = await prisma.menu.findMany({ orderBy: { id: "asc" } });
    return menus;
}

export async function getRegions() {
    const regions = await prisma.region.findMany({
        include: {
            prefectures: {
                orderBy: { id: "asc" }
            }
        },
        orderBy: { id: "asc" }
    });
    return regions;
}
const getTherapistWhere = ({ prefectureId, genderId, menuId, freeWord }) => {
    console.log("menuId is", menuId);
    return {
        ...(prefectureId && { prefectureId }),
        ...(genderId && { genderId }),
        ...(freeWord && {
            OR: [
                { name: { contains: freeWord } },
                { comment: { contains: freeWord } }
            ]
        }),
        ...(menuId && {
            menus: {
                some: {
                    menuId: menuId
                }
            }
        })
    }

}

export async function getTherapists({ page = 1, take = 10, prefectureId, genderId, menuId, freeWord }) {
    const session = await getServerSession(authOptions);
    const where = getTherapistWhere({ prefectureId, genderId, menuId, freeWord })
    try {
        const therapists = await prisma.therapist.findMany({
            where,
            skip: (page - 1) * take,
            take: take,
            include: {
                menus: {
                    include: {
                        menu: true
                    }
                },
                gender: true,
                prefecture: true,
                reservations: true,
                ...((session?.user?.role == "user") ? { favorites: { where: { userId: session.user.id }, } } : {})
            }
        });
        return therapists;
    } catch (err) {
        console.dir(err);
    }
}

export async function getTherapistsCount({ prefectureId, genderId, menuId, freeWord }) {
    const where = getTherapistWhere({ prefectureId, genderId, menuId, freeWord })
    const itemCount = await prisma.therapist.count({ where });
    return itemCount;
}


export async function getSenders() {
    const session = await getServerSession(authOptions);
    if (!(session?.user?.role == "user")) return;
    try {
        const senders = await prisma.therapist.findMany({
            where: {
                messages: {
                    some: {}
                }
            },
            include: {
                messages: {
                    where: {
                        userId: session.user.id,
                        NOT: {
                            messageStatusId: 4
                        }
                    },
                    take: 1,
                    orderBy: [
                        { created: "desc" }
                    ]
                }
            }
        });
        return senders;
    } catch (err) {
        console.dir(err);
    }
}

export async function getTherapist(id) {
    const therapist = await prisma.therapist.findFirst({
        where: { id },
        include: {
            reservations: {
                include: {
                    review: true
                }
            },
            prefecture: true,
            gender: true,
            menus: {
                include: {
                    menu: true,
                    reservations: {
                        include: {
                            review: true
                        }
                    }
                }
            },
        }
    })
    if (therapist) {
        therapist.imageFilePath = therapist?.imageFileName ? `/therapistImg/${therapist.id}/${therapist.imageFileName}` : ""

        therapist.name0 = therapist?.name && therapist.name.length > 0 ? therapist.name[0].toUpperCase() : ""

        therapist.prefectureAndCity = `${therapist.prefecture?.name || "-"}／${therapist.city || "-"}`;

        therapist.rateAverage = therapist?.reservations?.filter(reservation => reservation?.review)
            .map(reservation => reservation.review.rate)
            .reduce((acc, curr, _, arr) => acc + curr / arr.length, 0);

        therapist.fixedRateAverage = therapist?.rateAverage?.toFixed(1) || "-";

        therapist.reviewCount = therapist?.reservations?.filter(reservation => reservation?.review)?.length;

        therapist.isNew = new Date(therapist.created) > subWeeks(new Date(), 4)

        therapist.replyCount = therapist?.reservations?.filter(reservation => reservation.replyDt != null)?.length || 0;

        therapist.reservationCount = therapist?.reservations?.length || 0;

        therapist.replyRate = therapist?.reservationCount > 0 && therapist.reviewCount / therapist.reservationCount

        therapist.fixedReplyRate = therapist?.replyRate ? (therapist.replyRate * 100).toFixed(1) : "-";

        therapist.replyTime = (therapist?.reservations?.filter(reservation => reservation.replyDt != null)?.map(reservation => new Date(reservation.replyDt) - new Date(reservation.created)).reduce((acc, curr, _, arr) => acc + curr / arr.length, 0) || 0) / (1000 * 60)

        therapist.fixedReplyTime = therapist.replyTime > 0 ? therapist.replyTime : "-"
    }
    return therapist;
}

export async function getTherapistMenus(id) {
    const therapistMenus = await prisma.menu.findMany({
        where: {
            therapistMenus: {
                some: {
                    therapistId: id // therapistIdが一致するものだけ取得
                }
            }
        },
        select: {
            id: true,
            name: true,
            therapistMenus: {
                select: {
                    id: true,
                    therapistId: true,
                    price: true,
                    treatmentTime: true
                },
                where: {
                    therapistId: id
                },
                orderBy: {
                    treatmentTime: "asc"
                }
            }
        },
        orderBy: {
            id: "asc"
        }
    })
    return therapistMenus;
}

export async function getReviews(id) {
    const reviews = await prisma.review.findMany({
        where: {
            reservation: {
                therapistId: id
            }
        },
        select: {
            id: true,
            rate: true,
            comment: true,
            created: true,
            reservation: {
                select: {
                    user: {
                        select: {
                            gender: true,
                            prefecture: true,
                            city: true
                        }
                    }
                }
            }
        },
        orderBy: {
            created: "desc"
        }
    })
    return reviews
}
export async function setHistory(id) {
    const session = await getServerSession(authOptions);
    if (!(session?.user?.role == "user")) return;

    const therapistId_userId = {
        therapistId: id,
        userId: session.user.id
    }
    const historyCount = await prisma.history.count({ where: therapistId_userId });
    if (historyCount) {
        await prisma.history.update({ where: { therapistId_userId }, data: { created: new Date() } })
    } else {
        await prisma.history.create({ data: therapistId_userId })
    }
}

export async function getReservations() {
    const session = await getServerSession(authOptions);
    if (!(["user", "therapist"].includes(session?.user?.role))) return;

    try {
        const reservations = await prisma.reservation.findMany({
            where: {
                ...(session.user.role == "user" ? { userId: session.user.id } : { therapistId: session.user.id }),
            },
            select: {
                id: true,
                userId: true,
                therapistId: true,
                therapistMenuId: true,
                startDt: true,
                created: true,
                statusId: true,
                therapistMenu: {
                    select: {
                        menu: true
                    }
                },
                user: {
                    select: {
                        id: true,
                        name: true,
                        imageFileName: true
                    }
                },
                therapist: {
                    select: {
                        id: true,
                        name: true,
                        imageFileName: true
                    }
                },
                status: true
            },
            orderBy: {
                created: "desc"
            }
        });
        return reservations;
    } catch (err) {
        console.dir(err);
    }
}

export async function toggleFavorite(id) {
    const session = await getServerSession(authOptions);
    try {
        const therapistId_userId = {
            therapistId: id,
            userId: session.user.id,
        }
        const favoriteCount = await prisma.favorite.count({ where: therapistId_userId });
        if (favoriteCount) {
            await prisma.favorite.delete({ where: { therapistId_userId } })
        } else {
            await prisma.favorite.create({ data: therapistId_userId })
        }
    } catch (err) {
        console.dir(err);
    }

}
export async function getFavorites() {
    const session = await getServerSession(authOptions);
    if (!(session?.user?.role == "user")) return;
    try {
        const favorites = await prisma.favorite.findMany({
            where: { userId: session.user.id },
            include: { therapist: true },
            orderBy: { created: "desc" }
        })
        return favorites;
    } catch (err) {
        console.dir(err)
    }
}

export async function getHistories() {
    const session = await getServerSession(authOptions);
    if (!(session?.user?.role == "user")) return;
    try {
        const histories = await prisma.history.findMany({
            where: { userId: session.user.id },
            include: { therapist: true },
            orderBy: { created: "desc" }
        })
        return histories;
    } catch (err) {
        console.dir(err);
    }
}

export async function postReservation(data) {
    const session = await getServerSession(authOptions);
    if (!(session?.user?.role == "user")) return;
    try {
        const { therapistId, therapistMenuId, startDt } = data;
        const reservation = await prisma.reservation.create({
            data: {
                therapistId,
                userId: session.user.id,
                therapistMenuId,
                startDt: startDt + ":00.000+09:00"
            }
        });

        // 予約時にLineにメッセージを飛ばす
        const token = "zLLkznjy3U/eyy7Ww2far23qbarExZbgwt0e49HiGpVWcSG/ezyNROA2Zy4SrM8rxmidWcsvwp2BYhbaFWIQ2YR10chD+o49GL7kDVL8sGdyf7SiG5Ik159SQ2lBBFS2eXKnaGfpGDzuWBbG66BwqgdB04t89/1O/w1cDnyilFU="

        await axios.post(
            "https://api.line.me/v2/bot/message/push",
            {
                "to": "U0e811ac314b25d7ac84753a8e270974c",
                "messages": [
                    {
                        "type": "text",
                        "text": "予約を受付ました。"
                    }
                    ,
                    {
                        "type": "text",
                        "text": JSON.stringify(reservation)
                    }
                ]
            },
            {
                "headers": {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
        );
    } catch (err) {
        console.dir(err);
    }
}

export async function getMessages(id) {
    const session = await getServerSession(authOptions);
    if (!(session?.user?.role == "user")) return;
    try {
        const messages = await prisma.message.findMany({
            where: {
                userId: session.user.id,
                therapistId: id
            },
            include: {
                therapist: true,
                user: true
            },
            orderBy: {
                created: "desc"
            }
        });
        return messages;
    } catch (err) {
        console.dir(err);
    }
}

export async function postMessage(data) {
    const session = await getServerSession(authOptions);
    if (!(session?.user?.role == "user")) return;

    try {
        const { therapistId, message, messageStatusId } = data;

        const msg = await prisma.message.create({
            data: {
                userId: session.user.id,
                therapistId,
                message,
                messageStatusId
            }
        });
    } catch (err) {
        console.dir(err);
    }
}