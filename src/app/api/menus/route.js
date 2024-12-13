import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient({
    log: [
        {
            emit: "event",
            level: "query",
        },
    ],
});

prisma.$on("query", async (e) => {
    console.log(`${e.query} ${e.params}`)
});

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
        const menus = await prisma.menu.findMany({
            orderBy: {
                id: "asc"
            }
        });
        return NextResponse.json({ message: "Success", menus }, { status: 200 });
    } catch (err) {
        return NextResponse.json({ message: "Error", err }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
};