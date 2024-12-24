"use client"

import { getSenderUsers } from "@/app/actions";
import { AppBar, BottomBar, SenderList } from "@/app/components/t";
import { Container } from "@mui/material";
import { useEffect, useState } from "react";

export default function MessageSenderPage() {
    const [senders, setSenders] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            setSenders(await getSenderUsers());
        }
        fetchData();
    }, [])
    return (
        <>
            <AppBar />
            <Container maxWidth="sm">
                <SenderList senders={senders} />
            </Container>
            <BottomBar />
        </>
    )
}