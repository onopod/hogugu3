import prisma from '@/lib/prisma';
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
    const therapistId = (await params).therapistId;
    try {
        const reviews = await prisma.review.findMany({
            where: {
                reservation: {
                    therapistId: Number(therapistId)
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
        });
        return NextResponse.json({ message: "Success", reviews }, { status: 200 });
    } catch (err) {
        console.dir(err)
        return NextResponse.json({ message: "Error", err }, { status: 500 });
    }
};