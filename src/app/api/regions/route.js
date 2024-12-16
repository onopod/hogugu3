import prisma from '@/lib/prisma';
import { NextResponse } from "next/server";

export const GET = async () => {
    try {
        const regions = await prisma.region.findMany({
            include: {
                prefectures: {
                    orderBy: { id: "asc" }
                }
            },
            orderBy: { id: "asc" }
        });
        return NextResponse.json({ message: "Success", regions }, { status: 200 });
    } catch (err) {
        return NextResponse.json({ message: "Error", err }, { status: 500 });
    }
};

