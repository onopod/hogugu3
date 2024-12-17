import authOptions from "@/app/api/auth/[...nextauth]/authOptions";
import prisma from '@/lib/prisma';
import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";

export const GET = async (_) => {
    const session = await getServerSession(authOptions);
    try {
        const histories = await prisma.history.findMany({
            where: {
                userId: session.user.id
            },
            include: {
                therapist: true,
            },
            orderBy: {
                created: "desc"
            }
        })
        return NextResponse.json({ message: "Success", histories }, { status: 200 });
    } catch (err) {
        return NextResponse.json({ message: "Error", err }, { status: 500 });
    }
};