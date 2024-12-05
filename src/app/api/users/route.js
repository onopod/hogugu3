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

export const POST = async (req) => {
    try {
        const { name, mail, password } = await req.json();
        await main();
        const user = await prisma.user.create({ data: { name, mail, password } });
        return NextResponse.json({ message: "Success", user }, { status: 201 });
    } catch (err) {
        return NextResponse.json({ message: "Error", err }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
};