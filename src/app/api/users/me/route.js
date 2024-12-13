import authOptions from "@/app/api/auth/[...nextauth]/authOptions";
import { PrismaClient } from "@prisma/client";
import { promises as fs } from "fs";
import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";
import { join } from "path";



const prisma = new PrismaClient();

async function main() {
    try {
        await prisma.$connect();
    } catch (err) {
        return Error("DB接続に失敗しました");
    }
}

export const GET = async (req, res) => {
    const session = await getServerSession(authOptions);

    try {
        await main();
        const user = await prisma.user.findFirstOrThrow({
            where: {
                id: session.user.id
            }
        });
        return NextResponse.json({ message: "Success", user }, { status: 200 });
    } catch (err) {
        return NextResponse.json({ message: "Error", err }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
};


export const PUT = async (req) => {
    const session = await getServerSession(authOptions);

    try {

        await main();


        // FormData を取得
        const formData = await req.formData();

        // フィールドを取得
        const name = formData.get("name");
        const mail = formData.get("mail");
        const imageFile = formData.get("imageFileName");


        // ファイル名とデータを取得
        const fileName = imageFile.name;
        const arrayBuffer = await imageFile.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // 保存先のパスを指定
        const uploadDir = join(process.cwd(), "public", "userImg", session.user.id.toString());
        await fs.mkdir(uploadDir, { recursive: true });
        const filePath = join(uploadDir, fileName);
        // ファイルをサーバー上に保存
        await fs.writeFile(filePath, buffer);



        const user = await prisma.user.update({
            where: { id: session.user.id },
            data: { name, mail, imageFileName: imageFile.name }
        });
        console.dir(user);
        return NextResponse.json({ message: "Success", user }, { status: 200 });
    } catch (err) {
        console.dir(err)
        return NextResponse.json({ message: "Error", err }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
};