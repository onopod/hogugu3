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
        const user = await prisma.user.findFirstOrThrow({
            where: {
                id: session.user.id
            }
        });
        return NextResponse.json({ message: "Success", user }, { status: 200 });
    } catch (err) {
        return NextResponse.json({ message: "Error", err }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
};


export const PUT = async (req) => {
    const session = await getServerSession(authOptions);

    try {
        const { name, mail } = await req.json();
        await main();
        const user = await prisma.user.update({ where: { id: session.user.id }, data: { name, mail } });
        return NextResponse.json({ message: "Success", user }, { status: 200 });
    } catch (err) {
        return NextResponse.json({ message: "Error", err }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
};