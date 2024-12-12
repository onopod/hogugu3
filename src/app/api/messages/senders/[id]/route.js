import authOptions from "@/app/api/auth/[...nextauth]/authOptions";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth/next";
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
    const session = await getServerSession(authOptions);
    try {
        await main();
        const therapistId = parseInt(req.url.split("/senders/")[1]);
        const messages = await prisma.message.findMany({
            where: {
                userId: session.user.id,
                therapistId: therapistId
            },
            include: {
                therapist: true,
                user: true
            },
            orderBy: {
                created: "desc"
            }
        });
        return NextResponse.json({ message: "Success", messages }, { status: 200 });
    } catch (err) {
        console.dir(err);
        return NextResponse.json({ message: "Error", err }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
};



export const POST = async (req) => {
    const session = await getServerSession(authOptions);
    const therapistId = parseInt(req.url.split("/senders/")[1]);

    try {
        const { message, isUserSend } = await req.json();
        await main();
        const msg = await prisma.message.create({
            data: {
                userId: session.user.id,
                therapistId,
                message,
                isUserSend
            }
        });
        return NextResponse.json({ message: "Success", msg }, { status: 201 });
    } catch (err) {
        return NextResponse.json({ message: "Error", err }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
};