import prisma from '@/lib/prisma';
import { NextResponse } from "next/server";

export const GET = async () => {
    try {
        const genders = await prisma.gender.findMany({ orderBy: { id: "asc" } });
        return NextResponse.json({ message: "Success", genders }, { status: 200 });
    } catch (err) {
        return NextResponse.json({ message: "Error", err }, { status: 500 });
    }
};

