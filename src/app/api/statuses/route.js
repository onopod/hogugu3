import prisma from '@/lib/prisma';
import { NextResponse } from "next/server";

export const GET = async () => {
    try {
        const statuses = await prisma.status.findMany({})
        return NextResponse.json({ message: "Success", statuses }, { status: 200 });
    } catch (err) {
        return NextResponse.json({ message: "Error", err }, { status: 500 });
    }
};
