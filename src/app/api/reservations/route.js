import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";
import authOptions from "../auth/[...nextauth]/authOptions";

const prisma = new PrismaClient();

async function main() {
    try {
        await prisma.$connect();
    } catch (err) {
        return Error("DB接続に失敗しました");
    }
}

export const GET = async (req, res) => {
    const session = await getServerSession(authOptions);

    try {
        await main();

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
    } finally {
        await prisma.$disconnect();
    }
};



export const POST = async (req) => {
    const session = await getServerSession(authOptions);

    try {
        const { therapistMenuId, startDt } = await req.json();
        await main();
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
    } finally {
        await prisma.$disconnect();
    }
};