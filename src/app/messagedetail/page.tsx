"use client"

import MessageDetailList from "../components/MessageDetailList";
import AppBar from "../components/AppBar";
import BottomBar from "../components/BottomBar";
export default function MessageDetail() {
    return (
        <>
            <AppBar />
            <div className="items-center justify-items-center min-h-screen p-8">
                <main className="flex flex-col gap-8">
                    <MessageDetailList />
                </main>
            </div>
            <BottomBar />
        </>
    )
}