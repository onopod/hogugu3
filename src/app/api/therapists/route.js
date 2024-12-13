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
        const take = parseInt(req.nextUrl.searchParams.get("pageSize")) || 10;
        const page = parseInt(req.nextUrl.searchParams.get("page")) || 1;

        const therapists = await prisma.therapist.findMany({
            skip: (page - 1) * take,
            take: take,
            include: { menus: { include: { menu: true } } }
        });
        const itemCount = await prisma.therapist.count();
        return NextResponse.json({ message: "Success", therapists, itemCount: itemCount }, { status: 200 });
    } catch (err) {
        console.dir(err)
        return NextResponse.json({ message: "Error", err }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
};

export const POST = async (req) => {

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