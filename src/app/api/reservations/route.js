import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

async function main() {
    try {
        await prisma.$connect();
    } catch (err) {
        return Error("DB接続に失敗しました");
    }
}

export const GET = async (req, res) => {
    try {
        await main();
        const reservations = await prisma.reservation.findMany({
            where: {
                userId: 1
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
    const userId = 1;
    try {
        const { therapistMenuId, startDt } = await req.json();
        await main();
        const reservation = await prisma.reservation.create({

            data: {
                userId,
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