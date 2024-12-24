"use client"

import { getTherapistProfileMenus } from "@/app/actions";
import { AddIcon, CreateIcon } from "@/app/icons";
import { AppBar, BottomBar } from "@/app/components/t";
import { Container, List, ListItem, ListItemText, IconButton } from "@mui/material";

import { useEffect, useState } from "react";

export default function MenuPage() {
    const [menus, setMenus] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            setMenus(await getTherapistProfileMenus())
        }
        fetchData()
    }, [])
    console.log("data is")
    console.dir(menus)
    return (
        <>
            <AppBar />
            <Container maxWidth="sm">
                <List sx={{ width: '100%' }}>
                    {menus.length > 0 && menus.map(menu => [
                        <ListItem key={menu.id}
                            secondaryAction={
                                <IconButton edge="end" aria-label="add">
                                    <AddIcon />
                                </IconButton>
                            }
                        >
                            <ListItemText primary={menu.name} />
                        </ListItem>
                        ,
                        ...(menu.therapistMenus.length > 0 ? menu.therapistMenus.map((m) => (
                            <ListItem key={`_${m.id}`}
                                value={m.id}
                                secondaryAction={
                                    <IconButton edge="end" aria-label="update">
                                        <CreateIcon />
                                    </IconButton>
                                }
                            >
                                {m.treatmentTime}分 {m.price}円
                            </ListItem>
                        )) : [])
                    ]
                    )}
                </List>
            </Container>
            <BottomBar />
        </>
    )
}