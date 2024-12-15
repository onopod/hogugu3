"use client"

import { AppBar, BottomBar, SenderList } from "@/app/components";
import { Container } from "@mui/material";
import { useEffect, useState } from "react";

export default function MessageSenderPage() {
    const [senders, setSenders] = useState(null);
    useEffect(() => {
        fetch("/api/messages/senders")
            .then(res => res.json())
            .then(data => {
                console.log(data.senders);
                setSenders(data.senders);
            })
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