import prisma from '@/lib/prisma';
import { NextResponse } from "next/server";
export const GET = async () => {
    try {
        const prefectures = await prisma.prefecture.findMany({ orderBy: { id: "asc" } });
        return NextResponse.json({ message: "Success", prefectures }, { status: 200 });
    } catch (err) {
        return NextResponse.json({ message: "Error", err }, { status: 500 });
    }
};
