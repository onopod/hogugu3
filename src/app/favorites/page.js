"use client"

import { AppBar, BottomBar, Favorites } from "@/app/components";
import { Container } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProfilePage() {
    const [favorites, setFavorites] = useState([]);
    const router = useRouter();
    useEffect(() => {
        fetch("/api/favorites")
            .then(res => res.json())
            .then(data => {
                setFavorites(data.favorites)
            })
    }, [])

    return (
        <>
            <AppBar />
            <Container maxWidth="sm">
                <Favorites favorites={favorites} />
            </Container>
            <BottomBar />
        </>
    )
}