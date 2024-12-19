"use server"

import prisma from '@/lib/prisma';

async function getTherapist(id) {
    const therapist = await prisma.therapist.findFirst({
        where: { id },
        include: {
            reservations: true,
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
    return therapist
}
async function getReviews(therapistId) {
    const reviews = await prisma.review.findMany({
        where: {
            reservation: {
                therapistId: therapistId
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
export { getTherapist, getReviews }