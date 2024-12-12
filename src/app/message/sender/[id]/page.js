"use client"
import { useParams } from 'next/navigation'

import Messages from "@/app/components/Messages";
import AppBar from "@/app/components/AppBar";
import BottomBar from "@/app/components/BottomBar";
import { Container } from "@mui/material";
import { useState, useEffect } from "react";
export default function MessageSenderPage() {
    const [messages, setMessages] = useState([]);
    const params = useParams();

    const therapistId = 1;
    useEffect(() => {
        fetch(`/api/messages/senders/${params.id}`)
            .then(res => res.json())
            .then(data => {
                setMessages(data.messages);
                console.log(messages);
            })
    }, [messages, params.id])
    return (
        <>
            <AppBar />
            <Container maxWidth="sm">
                <Messages messages={messages} />
            </Container>
            <BottomBar />
        </>
    )
}