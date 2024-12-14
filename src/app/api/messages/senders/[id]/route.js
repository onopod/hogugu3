import authOptions from "@/app/api/auth/[...nextauth]/authOptions";
import prisma from '@/lib/prisma';
import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";

export const GET = async (req, res) => {
    const session = await getServerSession(authOptions);
    try {
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
    }
};



export const POST = async (req) => {
    const session = await getServerSession(authOptions);
    const therapistId = parseInt(req.url.split("/senders/")[1]);

    try {
        const { message, isUserSend } = await req.json();

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
    }
};