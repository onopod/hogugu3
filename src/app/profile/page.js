"use client"

import { Container } from "@mui/material";
import { useEffect, useState } from "react";
import AppBar from "../components/AppBar";
import BottomBar from "../components/BottomBar";
import Profile from "../components/Profile";
import { useForm } from "react-hook-form";

export default function ProfilePage() {
    const [user, setUser] = useState({})
    const { handleSubmit, register, reset } = useForm({
        defaultValues: {
            "name": user.name,
            "mail": user.mail
        }
    });
    const onSubmit = data => {
        fetch('/api/users/me', {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: data.name,
                mail: data.mail
            })
        })
    }
    useEffect(() => {
        fetch("/api/users/me")
            .then(res => res.json())
            .then(data => {
                setUser(data.user);
                reset({ name: data.user.name, mail: data.user.mail });
            })
        // eslint-disable-next-line
    }, [])
    return (
        <>
            <AppBar />
            <Container maxWidth="sm">
                <Profile handleSubmit={handleSubmit} onSubmit={onSubmit} register={register} />
            </Container>
            <BottomBar />
        </>
    )
}