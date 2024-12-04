"use client"
import { Box, Typography, Rating } from '@mui/material';
import Image from "next/image";
import AppBar from '../components/AppBar';
import BottomBar from "../components/BottomBar";
import BookingForm from "../components/BookingForm";

export default function TherapistPage() {
    return (
        <>
            <AppBar />
            <div className="items-center justify-items-center min-h-screen p-8">
                <main className="flex flex-col gap-8">
                    <Image
                        src="/paella.jpg"
                        width={500}
                        height={300}
                        alt="" />
                    <h1>山田 花子</h1>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        世田谷から出発🛫

                        ヨガインストラクターによる
                        タイ古式マッサージ🇹🇭🧘‍♂️✨

                        肩・首・頭の疲れ、
                        腰痛お任せください！
                    </Typography>
                    <Box sx={{ width: 200, display: 'flex', alignItems: 'center' }}>

                        <Rating name="half-rating"
                            precision={0.5}
                            size="small" value={4.5} />
                        <Box sx={{ ml: 2 }}>(4.5)</Box>
                    </Box>
                    <Box>
                        <Typography>もみほぐし:60min 6000円</Typography>
                        <Typography>もみほぐし:60min 6000円</Typography>
                    </Box>
                    <BookingForm />

                </main >
            </div >
            <BottomBar />
        </>
    );
}
