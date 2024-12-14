import prisma from '@/lib/prisma';
import { NextResponse } from "next/server";

export const POST = async (req) => {
    try {
        const { name, mail, password } = await req.json();
        const user = await prisma.user.create({ data: { name, mail, password } });
        return NextResponse.json({ message: "Success", user }, { status: 201 });
    } catch (err) {
        return NextResponse.json({ message: "Error", err }, { status: 500 });
    }
};