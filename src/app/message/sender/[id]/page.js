"use client"
import { AppBar, BottomBar, Messages } from "@/app/components";
import { Container } from "@mui/material";
import { useParams } from 'next/navigation';
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function MessageSenderPage() {
    const [messages, setMessages] = useState([]);
    const params = useParams();

    const fetchMessages = async () => {
        fetch(`/api/messages/senders/${params.id}`)
            .then(res => res.json())
            .then(data => {
                setMessages(data.messages);
            })
    }
    useEffect(() => {
        fetchMessages();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params.id])

    const { register, handleSubmit, reset } = useForm();
    const onSubmit = data => {
        fetch(`/api/messages/senders/${params.id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: data.message,
                messageStatusId: 1
            })
        })
            .then(() => {
                reset();
                fetchMessages();
            })
    }

    return (
        <>
            <AppBar />
            <Container maxWidth="sm">
                <Messages messages={messages} register={register} handleSubmit={handleSubmit} onSubmit={onSubmit} />
            </Container>
            <BottomBar />
        </>
    )
}