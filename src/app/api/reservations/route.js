import prisma from '@/lib/prisma';
import axios from 'axios';
import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";
import authOptions from "../auth/[...nextauth]/authOptions";

export const GET = async () => {
    const session = await getServerSession(authOptions);
    try {
        const reservations = await prisma.reservation.findMany({
            where: {
                userId: session.user.id
            },
            include: {
                therapistMenu: {
                    include: {
                        therapist: true,
                        menu: true
                    }
                },
                status: true
            },
            orderBy: {
                created: "desc"
            }
        });
        return NextResponse.json({ message: "Success", reservations }, { status: 200 });
    } catch (err) {
        return NextResponse.json({ message: "Error", err }, { status: 500 });
    }
};

export const POST = async (req) => {
    const session = await getServerSession(authOptions);
    try {
        const { therapistMenuId, startDt } = await req.json();
        const user = await prisma.user.findFirstOrThrow({
            where: { mail: session.user.email }
        })
        const reservation = await prisma.reservation.create({
            data: {
                userId: user.id,
                therapistMenuId,
                startDt: startDt + ":00.000+09:00"
            }
        });

        // 予約時にLineにメッセージを飛ばす
        console.log("送信開始")
        const token = "zLLkznjy3U/eyy7Ww2far23qbarExZbgwt0e49HiGpVWcSG/ezyNROA2Zy4SrM8rxmidWcsvwp2BYhbaFWIQ2YR10chD+o49GL7kDVL8sGdyf7SiG5Ik159SQ2lBBFS2eXKnaGfpGDzuWBbG66BwqgdB04t89/1O/w1cDnyilFU="

        const response = await axios.post(
            "https://api.line.me/v2/bot/message/push",
            {
                "to": "U0e811ac314b25d7ac84753a8e270974c",
                "messages": [
                    {
                        "type": "text",
                        "text": "予約を受付ました。"
                    }
                    ,
                    {
                        "type": "text",
                        "text": JSON.stringify(reservation)
                    }
                ]
            },
            {
                "headers": {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
        );
        //console.log(response.data)

        return NextResponse.json({ message: "Success", reservation }, { status: 201 });
    } catch (err) {
        //console.dir(err)
        return NextResponse.json({ message: "Error", err }, { status: 500 });
    }
};