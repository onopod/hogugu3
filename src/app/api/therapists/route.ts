import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function main() {
    try {
        await prisma.$connect();
    } catch (err) {
        return Error("DB接続に失敗しました");
    }
}

export const GET = async (req: Request, res: NextResponse) => {
    try {
        await main();
        const therapists = await prisma.therapist.findMany();
        return NextResponse.json({ message: "Success", therapists }, { status: 200 });
    } catch (err) {
        return NextResponse.json({ message: "Error", err }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
};

export const POST = async (req: Request, res: NextResponse) => {
    console.log("POST");

    try {
        const { name, comment } = await req.json();
        await main();
        const therapists = await prisma.therapist.create({ data: { name, comment } });
        return NextResponse.json({ message: "Success", therapists }, { status: 201 });
    } catch (err) {
        return NextResponse.json({ message: "Error", err }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
};