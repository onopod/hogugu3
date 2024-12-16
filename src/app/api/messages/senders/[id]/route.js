import authOptions from "@/app/api/auth/[...nextauth]/authOptions";
import prisma from '@/lib/prisma';
import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
    const session = await getServerSession(authOptions);
    try {
        const therapistId = parseInt((await params).id);
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
        return NextResponse.json({ message: "Error", err }, { status: 500 });
    }
};

export const POST = async (req, { params }) => {
    const session = await getServerSession(authOptions);
    const therapistId = parseInt((await params).id);

    try {
        const { message, messageStatusId } = await req.json();

        const msg = await prisma.message.create({
            data: {
                userId: session.user.id,
                therapistId,
                message,
                messageStatusId
            }
        });
        return NextResponse.json({ message: "Success", msg }, { status: 201 });
    } catch (err) {
        return NextResponse.json({ message: "Error", err }, { status: 500 });
    }
};