import authOptions from "@/app/api/auth/[...nextauth]/authOptions";
import prisma from '@/lib/prisma';
import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";

export const POST = async (_, { params }) => {
    const session = await getServerSession(authOptions);
    const therapistId = parseInt((await params).id);
    try {
        const therapistId_userId = {
            therapistId: therapistId,
            userId: session.user.id
        }
        const historyCount = await prisma.history.count({ where: therapistId_userId });
        if (historyCount) {
            await prisma.history.update({ where: { therapistId_userId }, data: { created: new Date() } })
            return NextResponse.json({ message: "Success" }, { status: 200 });
        } else {
            const history = await prisma.history.create({ data: therapistId_userId })
            return NextResponse.json({ message: "Success", history }, { status: 200 });
        }
    } catch (err) {
        console.dir(err);
        return NextResponse.json({ message: "Error", err }, { status: 500 });
    }
};