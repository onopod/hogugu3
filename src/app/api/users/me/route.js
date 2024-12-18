import authOptions from "@/app/api/auth/[...nextauth]/authOptions";
import prisma from '@/lib/prisma';
import { promises as fs } from "fs";
import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";
import { join } from "path";

export const GET = async (req, res) => {
    const session = await getServerSession(authOptions);
    try {
        const user = await prisma.user.findFirstOrThrow({
            where: {
                id: session.user.id
            }
        });
        return NextResponse.json({ message: "Success", user }, { status: 200 });
    } catch (err) {
        return NextResponse.json({ message: "Error", err }, { status: 500 });
    }
};


export const PUT = async (req) => {
    const session = await getServerSession(authOptions);
    try {
        const formData = await req.formData();

        const name = formData.get("name");
        const genderId = parseInt(formData.get("genderId"));
        const mail = formData.get("mail");
        const tel = formData.get("tel");
        const imageFile = formData.get("imageFileName");
        const zipcode = formData.get("zipcode")
        const prefectureId = parseInt(formData.get("prefectureId"))
        const city = formData.get("city")
        const address = formData.get("address")
        console.log("pref is")
        console.log(prefectureId);
        if (imageFile?.arrayBuffer) {
            const fileName = imageFile.name;
            const arrayBuffer = await imageFile.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);

            // 保存先のパスを指定
            const uploadDir = join(process.cwd(), "public", "userImg", session.user.id.toString());
            await fs.mkdir(uploadDir, { recursive: true });
            const filePath = join(uploadDir, fileName);
            // ファイルをサーバー上に保存
            await fs.writeFile(filePath, buffer);

        }

        const user = await prisma.user.update({
            where: { id: session.user.id },
            data: {
                name,
                genderId,
                mail,
                tel,
                imageFileName: imageFile.name,
                zipcode,
                prefectureId,
                city,
                address
            }
        });
        return NextResponse.json({ message: "Success", user }, { status: 200 });
    } catch (err) {
        console.dir(err)
        return NextResponse.json({ message: "Error", err }, { status: 500 });
    }
};