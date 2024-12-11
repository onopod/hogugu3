"use client"

import { Container } from "@mui/material";
import { useEffect, useState } from "react";
import AppBar from "../components/AppBar";
import BottomBar from "../components/BottomBar";
export default function ProfilePage() {
    const [user, setUser] = useState({});
    useEffect(() => {
        fetch("/api/user/me")
            .then(res => res.json())
            .then(data => {
                setUser(data.user);
            })
    }, [])
    return (
        <>
            <AppBar />
            <Container maxWidth="sm">
                {user.name}
            </Container>
            <BottomBar />
        </>
    )
}