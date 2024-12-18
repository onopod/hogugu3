import prisma from '@/lib/prisma';
import { NextResponse } from "next/server";
const bcrypt = require('bcrypt');

export const POST = async (req) => {
    try {
        const { name, mail, tel, password } = await req.json();
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: {
                name,
                mail,
                tel,
                password: hashedPassword
            }
        });
        return NextResponse.json({ message: "Success", user }, { status: 201 });
    } catch (err) {
        console.dir(err)
        return NextResponse.json({ message: "Error", err }, { status: 500 });
    }
};