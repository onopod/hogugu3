"use client"

import { Box } from "@mui/material";
import AppBar from "../components/AppBar";
import SnackBar from "../components/SnackBar";
export default function Dashboard() {
    return (
        <>
            <AppBar />
            <SnackBar />
            <div className="items-center justify-items-center min-h-screen p-8">
                <main className="flex flex-col gap-8">
                    <h2>予約内容</h2>
                    <Box>
                        2024/12/1 12:00 もみほぐし60分
                        山田花子
                    </Box>
                </main>
            </div>
        </>
    )
}