import authOptions from "@/app/api/auth/[...nextauth]/authOptions";
import prisma from '@/lib/prisma';
import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";

export const GET = async (req) => {
    const session = await getServerSession(authOptions);
    try {
        const therapistId = parseInt(req.url.split("/toggle/")[1]);
        const therapistId_userId = {
            therapistId: therapistId,
            userId: session.user.id,
        }
        const favoriteCount = await prisma.favorite.count({ where: therapistId_userId });
        if (favoriteCount) {
            await prisma.favorite.delete({ where: { therapistId_userId } })
            return NextResponse.json({ message: "Success" }, { status: 200 });
        } else {
            const favorite = await prisma.favorite.create({ data: therapistId_userId })
            return NextResponse.json({ message: "Success", favorite }, { status: 200 });
        }
    } catch (err) {
        return NextResponse.json({ message: "Error", err }, { status: 500 });
    }
};