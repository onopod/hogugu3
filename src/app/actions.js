"use server"

import authOptions from "@/app/api/auth/[...nextauth]/authOptions";
import prisma from '@/lib/prisma';
import { subWeeks } from "date-fns";
import { promises as fs } from "fs";
import { getServerSession } from "next-auth/next";
import Stripe from 'stripe';

import { join } from "path";
const bcrypt = require('bcrypt');

export async function checkSuccessStripe({ reservation_id, stripe_session_id }) {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const stripeSession = await stripe.checkout.sessions.retrieve(stripe_session_id);
    if (stripeSession?.payment_status == "paid") {
        // 予約ステータスを決済後に変更
        await changeReservationStatusToPaid(reservation_id)
    }
}

export async function checkoutStripe(reservationId) {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const stripeSession = await stripe.checkout.sessions.create({
        line_items: [
            {
                price: 'price_1Qa7DSCjiodSo9Y9S72OE3X2',
                quantity: 1,
            },
        ],
        mode: 'payment',
        success_url: `http://localhost:3000/checkout/success/${reservationId}/{CHECKOUT_SESSION_ID}`,
        cancel_url: "http://localhost:3000/checkout/cancel",
    });
    if (stripeSession) {
        return stripeSession.url
    }
    console.dir(reservationId)
    console.dir(stripeSession)
}


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

export async function getUserPrefectureAndCity() {
    const session = await getServerSession(authOptions);
    if (!(session?.user?.role == "user")) {
        return;
    }
    try {
        const user = await prisma.user.findFirst({
            select: {
                id: true,
                prefectureId: true
            },
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

export async function getCities(prefectureId) {
    const cities = await prisma.city.findMany({ where: { prefectureId }, orderBy: { id: "asc" } });
    return cities;
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
const getTherapistWhere = ({ treatmentDt, prefectureId, cityId, genderId, menuId, freeWord, priceRange }) => {
    const prices = priceRange ? priceRange.split("-").map(s => parseInt(s)) : []
    const where = {
        ...(prefectureId && { prefectureId }),
        ...(cityId && { cityId }),
        ...(genderId && { genderId }),
        ...(freeWord && {
            OR: [
                { name: { contains: freeWord } },
                { comment: { contains: freeWord } }
            ]
        }),
        ...((menuId || priceRange) && {
            menus: {
                some: {
                    ...(menuId ? { menuId: menuId } : {}),
                    ...(prices?.[0] ? { price: { gte: prices[0] } } : {}),
                    ...(prices?.[1] ? { price: { lte: prices[1] } } : {}),
                }
            },
        }),
        ...(treatmentDt && {
            schedules: {
                some: {
                    AND: [
                        { startDt: { lte: treatmentDt + ":00.000+09:00" } },
                        { endDt: { gte: treatmentDt + ":00.000+09:00" } }
                    ]
                }
            }
        })
    }
    console.log("where is")
    console.log(JSON.stringify(where))
    return where;
}

export async function getTherapists({ page = 1, take = 10, sort = "createdDesc", treatmentDt, prefectureId, cityId, genderId, menuId, freeWord, priceRange }) {
    const session = await getServerSession(authOptions);
    const where = getTherapistWhere({ treatmentDt, prefectureId, cityId, genderId, menuId, freeWord, priceRange })
    try {
        const therapists = await prisma.therapist.findMany({
            select: {
                therapistView: true,
                id: true,
                name: true,
                genderId: true,
                gender: true,
                comment: true,
                imageFileName: true,
                prefectureId: true,
                prefecture: true,
                cityId: true,
                city: true,
                workYear: true,
                created: true,
                menus: {
                    select: {
                        menu: true
                    }
                },
                reservations: {
                    select: {
                        id: true,
                        startDt: true,
                        therapistMenu: {
                            select: {
                                id: true,
                                treatmentTime: true
                            }
                        },
                        review: {
                            select: {
                                rate: true
                            }
                        }
                    }
                },
                favorites: {
                    select: {
                        id: true
                    }
                },
                schedules: {
                    select: {
                        startDt: true,
                        endDt: true
                    },
                    where: {
                        endDt: {
                            gte: new Date()
                        }
                    },
                    orderBy: [
                        { startDt: "asc" }
                    ]
                },
                ...((session?.user?.role == "user") ? { favorites: { where: { userId: session.user.id }, } } : {})
            },
            orderBy: {
                ...(sort == "createdDesc" ? { created: "desc" }
                    : sort == "priceAsc" ? { therapistView: { minMenuPrice: "asc" } }
                        : sort == "replyRateDesc" ? { therapistView: { replyRate: "desc" } }
                            : sort == "reviewRateDesc" ? { therapistView: { reviewRate: "desc" } }
                                : sort == "reviewCountDesc" ? { therapistView: { reviewCount: "desc" } }
                                    : {})
            },
            where,
            skip: (page - 1) * take,
            take: take
        });
        return therapists;
    } catch (err) {
        console.dir(err);
    }
}

export async function getTherapistsCount({ treatmentDt, prefectureId, cityId, genderId, menuId, freeWord, priceRange }) {
    const where = getTherapistWhere({ treatmentDt, prefectureId, cityId, genderId, menuId, freeWord, priceRange })
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

export async function getSenderUsers() {
    const session = await getServerSession(authOptions);
    if (!(session?.user?.role == "therapist")) return;
    try {
        const senders = await prisma.user.findMany({
            where: {
                messages: {
                    some: {}
                }
            },
            include: {
                messages: {
                    where: {
                        therapistId: session.user.id,
                        NOT: {
                            messageStatusId: 3
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
export async function getTherapistProfile() {
    const session = await getServerSession(authOptions);
    if (!(session?.user?.role == "therapist")) return;
    try {
        const therapist = prisma.therapist.findFirst({
            where: { id: session.user.id },
            select: {
                id: true,
                name: true,
                comment: true,
                mail: true,
                tel: true,
                genderId: true,
                gender: true,
                imageFileName: true,
                prefectureId: true,
                prefecture: true,
                cityId: true,
                city: true,
                workYear: true
            }
        })
        return therapist;
    } catch (err) {
        console.log(err);
    }
}

export async function putTherapist(formData) {
    const session = await getServerSession(authOptions);
    if (!(session?.user?.role == "therapist")) return;
    try {
        const name = formData.get("name");
        const genderId = parseInt(formData.get("genderId"));
        const mail = formData.get("mail");
        const tel = formData.get("tel");
        const imageFile = formData.get("imageFileName");
        const prefectureId = parseInt(formData.get("prefectureId"))
        const cityId = formData.get("cityId")
        const workYear = parseInt(formData.get("workYear"))
        const comment = formData.get("comment")

        if (imageFile?.arrayBuffer) {
            const fileName = imageFile.name;
            const arrayBuffer = await imageFile.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);

            // 保存先のパスを指定
            const uploadDir = join(process.cwd(), "public", "therapistImg", session.user.id.toString());
            await fs.mkdir(uploadDir, { recursive: true });
            const filePath = join(uploadDir, fileName);
            // ファイルをサーバー上に保存
            await fs.writeFile(filePath, buffer);

        }

        const therapist = await prisma.therapist.update({
            where: { id: session.user.id },
            data: {
                name,
                genderId,
                mail,
                tel,
                imageFileName: imageFile.name,
                prefectureId,
                cityId,
                workYear,
                comment
            }
        });
        return therapist;
    } catch (err) {
        console.dir(err)
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
            therapistView: true,
        }
    })
    if (therapist) {
        therapist.imageFilePath = therapist?.imageFileName ? `/therapistImg/${therapist.id}/${therapist.imageFileName}` : ""

        therapist.name0 = therapist?.name && therapist.name.length > 0 ? therapist.name[0].toUpperCase() : ""

        therapist.prefectureAndCity = `${therapist.prefecture?.name || "-"}／${therapist.city?.city || "-"}`;

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
export async function postTherapistMenu(postData) {

    const session = await getServerSession(authOptions);
    if (!(session?.user?.role == "therapist")) return;
    try {
        if (postData?.id) {
            const therapistMenu = await prisma.TherapistsOnMenus.update({
                where: {
                    id: postData.id,
                    therapistId: session.user.id,
                    menuId: postData.menuId,
                },
                data: {
                    treatmentTime: postData.treatmentTime,
                    price: postData.price
                }
            })
            return therapistMenu;
        } else {
            const therapistMenu = await prisma.TherapistsOnMenus.create({
                data: {
                    menuId: postData.menuId,
                    therapistId: session.user.id,
                    treatmentTime: postData.treatmentTime,
                    price: postData.price
                }
            })
            return therapistMenu;
        }
    } catch (err) {
        console.dir(err)
    }
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
export async function deleteTherapistMenu(id) {
    const session = await getServerSession(authOptions);
    if (!(session?.user?.role == "therapist")) return;
    try {
        await prisma.TherapistsOnMenus.delete({
            where: {
                id,
                therapistId: session.user.id
            }
        })
    } catch (err) {
        console.dir(err)
    }
}

export async function getTherapistProfileMenus() {
    const session = await getServerSession(authOptions);
    if (!(session?.user?.role == "therapist")) return;

    const therapistMenus = await prisma.menu.findMany({
        select: {
            id: true,
            name: true,
            therapistMenus: {
                select: {
                    id: true,
                    menuId: true,
                    therapistId: true,
                    price: true,
                    treatmentTime: true
                },
                where: {
                    therapistId: session.user.id
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
export async function changeReservationStatusToAccept(id) {
    const session = await getServerSession(authOptions);
    if (!(session?.user?.role == "therapist")) return;
    const where = {
        id,
        therapistId: session.user.id, // 自分宛ての予約
        statusId: 1 // 予約リクエスト状態の予約
    }
    try {
        const reservation = prisma.reservation.update({
            where,
            data: {
                statusId: 2,
                replyDt: new Date()
            }
        })
        return reservation;
    } catch (err) {
        console.log(err)
    }
}
export async function payment(id) {
    const session = await getServerSession(authOptions);
    if (!(session?.user?.role == "user")) return;
    if (!is_paid()) return;
    await changeReservationStatusToPaid(id)
}
function is_paid() {
    // 支払い部分は後で実装
    return true;
}

async function changeReservationStatusToPaid(id) {
    const session = await getServerSession(authOptions);
    if (!(session?.user?.role == "user")) return;
    const where = {
        id,
        userId: session.user.id,
        statusId: 2 // ステータスが「予約確定」の状態のみ
    }
    try {
        const reservation = prisma.reservation.update({
            where,
            data: {
                statusId: 3
            }
        })
        return reservation;
    } catch (err) {
        console.log(err)
    }
}

export async function changeReservationStatusToComplete(id) {
    const session = await getServerSession(authOptions);
    if (!(session?.user?.role == "therapist")) return;
    const where = {
        id,
        therapistId: session.user.id, // 自分宛ての予約
        statusId: 3 // 予約リクエスト状態の予約
    }
    try {
        const reservation = prisma.reservation.update({
            where,
            data: {
                statusId: 4
            }
        })
        return reservation;
    } catch (err) {
        console.log(err)
    }
}
export async function changeReservationStatusToCancel(id) {
    const session = await getServerSession(authOptions);
    if (!(["user", "therapist"].includes(session?.user?.role))) return;
    const where = {
        id,
        // 自分宛ての予約
        ...(session.user.role == "user" ? {
            userId: session.user.id
        } : {
            therapistId: session.user.id
        }),
        statusId: {  // ステータスが「予約リクエスト」「予約確定」の状態のみキャンセル可能
            in: [1, 2]
        }
    }
    try {
        const reservation = prisma.reservation.update({
            where,
            data: {
                statusId: 9,
                ...(session.user.role == "therapist" ? { replyDt: new Date() } : {})
            }
        })
        return reservation;
    } catch (err) {
        console.log(err)
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
    if (!(["user", "therapist"].includes(session?.user?.role))) return;
    try {
        const messages = await prisma.message.findMany({
            where: {
                ...(session.user.role == "user" ? {
                    userId: session.user.id,
                    therapistId: id
                } : {
                    userId: id,
                    therapistId: session.user.id
                }),
            },
            select: {
                id: true,
                therapistId: true,
                userId: true,
                message: true,
                messageStatusId: true,
                isRead: true,
                created: true,
                messageStatus: true,
                therapist: {
                    select: {
                        id: true,
                        name: true,
                        imageFileName: true
                    }
                },
                user: {
                    select: {
                        id: true,
                        name: true,
                        imageFileName: true
                    }
                }
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
    if (!(["user", "therapist"].includes(session?.user?.role))) return;

    try {
        const { id, message } = data;

        const msg = await prisma.message.create({
            data: {
                ...(session.user.role == "user" ? {
                    userId: session.user.id,
                    therapistId: id,
                    messageStatusId: 1
                } : {
                    userId: id,
                    therapistId: session.user.id,
                    messageStatusId: 2
                }),
                message
            }
        });
    } catch (err) {
        console.dir(err);
    }
}

export async function deleteSchedule(id) {
    const session = await getServerSession(authOptions);
    if (!(session?.user?.role == "therapist")) return;
    try {
        await prisma.schedule.delete({
            where: {
                id,
                therapistId: session.user.id
            }
        })
    } catch (err) {
        console.dir(err)
    }
}

export async function getSchedules() {
    const session = await getServerSession(authOptions);
    if (!(session?.user?.role == "therapist")) return;
    try {
        const schedules = prisma.schedule.findMany({
            where: {
                therapistId: session.user.id
            }
        })
        return schedules
    } catch (err) {
        console.dir(err)
    }
}
export async function postSchedule(data) {
    const session = await getServerSession(authOptions);
    if (!(session?.user?.role == "therapist")) return;
    try {
        if (data?.id) {
            const schedule = await prisma.schedule.update({
                where: {
                    id: data.id,
                    therapistId: session.user.id,
                },
                data: {
                    startDt: data.startDt + ":00.000+09:00",
                    endDt: data.endDt + ":00.000+09:00"
                }
            })
            return schedule;
        } else {
            const schedule = await prisma.schedule.create({
                data: {
                    therapistId: session.user.id,
                    startDt: data.startDt + ":00.000+09:00",
                    endDt: data.endDt + ":00.000+09:00"
                }
            })
            return schedule;
        }
    } catch (err) {
        console.dir(err)
    }
}