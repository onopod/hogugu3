"use client"
import { Avatar, List, ListItem, ListItemAvatar, ListItemButton, ListItemText } from '@mui/material';
import AppBar from '../components/AppBar';
import BottomBar from "../components/BottomBar";

export default function ReservationPage() {
    return (
        <>
            <AppBar />
            <div className="items-center justify-items-center min-h-screen p-8">
                <main className="flex flex-col gap-8">
                    <h2>予約一覧</h2>
                    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar alt="Tanaka Mitsuru" src="/avatar.jpg" />
                            </ListItemAvatar>
                            <ListItemText primary="Tanaka Mitsuru" />
                            <ListItemButton />
                            tes
                        </ListItem>
                        <ListItem>
                            tes
                        </ListItem>
                    </List>
                </main >
            </div >
            <BottomBar />
        </>
    );
}
