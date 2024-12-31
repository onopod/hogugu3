"use client"

import { updateTherapistLastLoginDt } from "@/app/actions";
import { AppBar, BottomBar } from "@/app/components/t";
import { Container } from "@mui/material";
import { useEffect } from "react";
export default function T() {
    useEffect(() => {
        const updateLogin = async () => {
            await updateTherapistLastLoginDt()
        }
        updateLogin();
    }, [])
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