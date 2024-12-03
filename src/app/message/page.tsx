"use client"

import MessageUserList from "../components/MessageUserList";
import AppBar from "../components/AppBar";
import BottomBar from "../components/BottomBar";
export default function Dashboard() {
    return (
        <>
            <AppBar />
            <div className="items-center justify-items-center min-h-screen p-8">
                <main className="flex flex-col gap-8">
                    <MessageUserList />
                </main>
            </div>
            <BottomBar />
        </>
    )
}