"use client"
import { Box } from '@mui/material';
import Rating from '@mui/material/Rating';
import Image from "next/image";
import AppBar from '../components/AppBar';


export default function Home() {
    return (
        <>
            <AppBar />
            <div className="items-center justify-items-center min-h-screen p-8">
                <main className="flex flex-col gap-8">
                    <Image
                        src="/paella.jpg"
                        layout="response"
                        width={400}
                        height={320}
                        alt="" />
                    <h1>山田 花子</h1>
                    <Box sx={{ width: 200, display: 'flex', alignItems: 'center' }}>

                        <Rating name="half-rating"
                            precision={0.5}
                            size="small" value={4.5} />
                        <Box sx={{ ml: 2 }}>(4.5)</Box>
                    </Box>

                </main >
            </div >
        </>
    );
}
