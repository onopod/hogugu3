"use server"

import authOptions from "@/app/api/auth/[...nextauth]/authOptions";
import prisma from '@/lib/prisma';
import { subWeeks } from "date-fns";
import { getServerSession } from "next-auth/next";

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
    therapist.imageFilePath = therapist.imageFileName ? `/therapistImg/${therapist.id}/${therapist.imageFileName}` : ""

    therapist.name0 = therapist?.name && therapist.name.length > 0 ? therapist.name[0].toUpperCase() : ""

    therapist.prefectureAndCity = `${therapist.prefecture?.name || "-"}／${therapist.city || "-"}`;

    therapist.rateAverage = therapist.reservations?.filter(reservation => reservation?.review)
        .map(reservation => reservation.review.rate)
        .reduce((acc, curr, _, arr) => acc + curr / arr.length, 0);

    therapist.fixedRateAverage = therapist.rateAverage?.toFixed(1) || "-";

    therapist.reviewCount = therapist.reservations?.filter(reservation => reservation?.review)?.length;

    therapist.isNew = new Date(therapist.created) > subWeeks(new Date(), 4)

    therapist.replyCount = therapist.reservations?.filter(reservation => reservation.replyDt != null)?.length || 0;

    therapist.reservationCount = therapist.reservations?.length || 0;

    therapist.replyRate = therapist.reservationCount > 0 && therapist.reviewCount / therapist.reservationCount

    therapist.fixedReplyRate = therapist.replyRate ? (therapist.replyRate * 100).toFixed(1) : "-";

    therapist.replyTime = (therapist.reservations?.filter(reservation => reservation.replyDt != null)?.map(reservation => new Date(reservation.replyDt) - new Date(reservation.created)).reduce((acc, curr, _, arr) => acc + curr / arr.length, 0) || 0) / (1000 * 60)

    therapist.fixedReplyTime = therapist.replyTime > 0 ? therapist.replyTime : "-"
    console.log(therapist)
    return therapist;
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
    if (!session) return;

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