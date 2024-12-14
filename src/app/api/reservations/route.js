import prisma from '@/lib/prisma';
import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";
import authOptions from "../auth/[...nextauth]/authOptions";

export const GET = async (req, res) => {
    const session = await getServerSession(authOptions);

    try {
        const reservations = await prisma.reservation.findMany({
            where: {
                userId: session.user.id
            },
            include: {
                therapistMenu: {
                    include: {
                        therapist: true,
                        menu: true,
                    }
                }
            },
            orderBy: {
                created: "desc"
            }
        });
        return NextResponse.json({ message: "Success", reservations }, { status: 200 });
    } catch (err) {
        return NextResponse.json({ message: "Error", err }, { status: 500 });
    }
};



export const POST = async (req) => {
    const session = await getServerSession(authOptions);

    try {
        const { therapistMenuId, startDt } = await req.json();
        const user = await prisma.user.findFirstOrThrow({
            where: { mail: session.user.email }
        })
        const reservation = await prisma.reservation.create({

            data: {
                userId: user.id,
                therapistMenuId,
                startDt: startDt + ":00.000+09:00"
            }
        });
        return NextResponse.json({ message: "Success", reservation }, { status: 201 });
    } catch (err) {
        return NextResponse.json({ message: "Error", err }, { status: 500 });
    }
};