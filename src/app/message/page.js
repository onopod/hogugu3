"use client"

import SenderList from "../components/SenderList";
import AppBar from "../components/AppBar";
import BottomBar from "../components/BottomBar";
import { Container } from "@mui/material";
import { useState, useEffect } from "react";
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