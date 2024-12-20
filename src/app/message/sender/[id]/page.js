"use client"

import { getMessages, postMessage } from "@/app/actions";
import { AppBar, BottomBar, Messages } from "@/app/components";
import { Container } from "@mui/material";
import { useParams } from 'next/navigation';
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function MessageSenderPage() {
    const [messages, setMessages] = useState([]);
    const params = useParams();

    const fetchData = async (id) => {
        setMessages(await getMessages(id));
    }
    useEffect(() => {
        fetchData(Number(params.id));
    }, [params.id])

    const { register, handleSubmit, reset } = useForm();
    const onSubmit = data => {
        const send = async () => {
            const message = {
                therapistId: Number(params.id),
                message: data.message,
                messageStatusId: 1
            }
            await postMessage(message)
        }
        send();
        reset();
        fetchData(Number(params.id));
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