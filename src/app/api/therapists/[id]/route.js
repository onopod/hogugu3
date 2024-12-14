import prisma from '@/lib/prisma';
import { NextResponse } from "next/server";

export const GET = async (req, res) => {
    try {
        const id = parseInt(req.url.split("/therapists/")[1]);

        const therapist = await prisma.therapist.findFirst({
            where: { id },
            include: { menus: { include: { menu: true } } }
        });

        if (!therapist) {
            return NextResponse.json({ message: "Not Found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Success", therapist }, { status: 200 });
    } catch (err) {
        return NextResponse.json({ message: "Error", err }, { status: 500 });
    }
};

export const PUT = async (req, res) => {
    try {
        const id = parseInt(req.url.split("/therapists/")[1]);
        const { title, description } = await req.json();

        const post = await prisma.therapists.update({
            data: { title, description },
            where: { id },
        });

        return NextResponse.json({ message: "Success", post }, { status: 200 });
    } catch (err) {
        return NextResponse.json({ message: "Error", err }, { status: 500 });
    }
};

export const DELETE = async (req, res) => {
    try {
        const id = parseInt(req.url.split("/therapists/")[1]);

        const post = await prisma.therapist.delete({
            where: { id },
        });

        return NextResponse.json({ message: "Success", post }, { status: 200 });
    } catch (err) {
        return NextResponse.json({ message: "Error", err }, { status: 500 });
    }
};