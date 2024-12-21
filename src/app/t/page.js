"use client"

import { AppBar, BottomBar } from "@/app/components";
import { Container } from "@mui/material";
export default function T() {
    return (
        <>
            <AppBar />
            <Container maxWidth="sm">
                test
            </Container>
            <BottomBar />
        </>
    )
}