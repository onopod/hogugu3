"use client"

import { Container } from "@mui/material";
import AppBar from "../components/AppBar";
import BottomBar from "../components/BottomBar";
import MessageDetailList from "../components/MessageDetailList";
export default function MessageDetail() {
    return (
        <>
            <AppBar />
            <Container maxWidth="sm">
                <MessageDetailList />
            </Container>
            <BottomBar />
        </>
    )
}