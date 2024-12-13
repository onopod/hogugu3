import authOptions from "@/app/api/auth/[...nextauth]/authOptions";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth/next";
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
    const session = await getServerSession(authOptions);

    try {
        await main();
        const prefectureId = parseInt(req.nextUrl.searchParams.get("prefectureId"));
        const menuId = parseInt(req.nextUrl.searchParams.get("menuId"))
        const freeWord = req.nextUrl.searchParams.get("freeWord")
        const take = parseInt(req.nextUrl.searchParams.get("pageSize")) || 10;
        const page = parseInt(req.nextUrl.searchParams.get("page")) || 1;
        const where = {
            ...(prefectureId && { prefectureId }),
            ...(freeWord && {
                OR: [
                    { name: { contains: freeWord } },
                    { comment: { contains: freeWord } }
                ]
            }),
            ...(menuId && {
                menus: {
                    some: {
                        id: {
                            equals: menuId
                        }
                    }
                }
            })
        }
        const therapists = await prisma.therapist.findMany({
            where,
            skip: (page - 1) * take,
            take: take,
            include: {
                menus: {
                    include: {
                        menu: true
                    }
                },
                prefecture: true,
                favorites: {
                    where: {
                        userId: session.user.id
                    },
                }
            }
        });
        const itemCount = await prisma.therapist.count({
            where
        });
        return NextResponse.json({ message: "Success", itemCount, therapists }, { status: 200 });
    } catch (err) {
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