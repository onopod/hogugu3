"use client"

import { deleteTherapistMenu, getTherapistProfileMenus, postTherapistMenu } from "@/app/actions";
import { AppBar, BottomBar } from "@/app/components/t";
import { AddIcon, CreateIcon, DeleteIcon } from "@/app/icons";
import { Button, Container, Dialog, DialogContent, DialogTitle, FormControl, IconButton, List, ListItem, ListItemText, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { FormProvider, useForm, useFormContext } from 'react-hook-form';

function MenuCreateDialog(props) {
    const { menus, onClose, onSubmit, open } = props;
    const { register, reset, getValues } = useFormContext({
        defaultValues: {
            treatmentTime: ""
        }
    });
    const handleClose = (onClose) => {
        reset();
        onClose();
    };
    const getMenuName = () => {
        const dialogType = getValues("id") ? "更新" : "新規登録";
        const menuId = Number(getValues("menuId"))
        const menuName = menuId && menus?.length > 0 ? menus.filter(menu => menu.id == menuId)[0].name : "";
        return `${menuName}の${dialogType}`
    }
    return (
        <Dialog onClose={() => handleClose(onClose)} open={open}>
            <DialogTitle>{getMenuName()}</DialogTitle>
            <DialogContent>
                <form onSubmit={onSubmit}>
                    <FormControl fullWidth>
                        施術時間：<TextField id="treatmentTime" type="number" {...register("treatmentTime")} />
                    </FormControl>
                    <FormControl fullWidth>
                        料金：<TextField id="price" type="number" {...register("price")} />
                    </FormControl>
                    <Button type="submit">登録</Button>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default function MenuPage() {
    const [open, setOpen] = useState(false);
    const methods = useForm();


    const handleCreateOpen = (menuId) => {
        methods.setValue("menuId", menuId)
        setOpen(true);
    };
    const handleUpdateOpen = (therapistMenu) => {
        methods.setValue("id", therapistMenu.id)
        methods.setValue("menuId", therapistMenu.menuId)
        methods.setValue("price", therapistMenu.price)
        methods.setValue("treatmentTime", therapistMenu.treatmentTime)
        setOpen(true);
    }
    const handleDeleteOpen = (id) => {
        const deleteData = async (id) => {
            await deleteTherapistMenu(id)
        }
        deleteData(id)
        fetchData()
    }

    const onClose = () => {
        setOpen(false);
    };

    const saveTherapistMenu = async (data) => {
        await postTherapistMenu({
            ...(data.id ? { id: data.id } : {}),
            menuId: data.menuId,
            treatmentTime: Number(data.treatmentTime),
            price: Number(data.price)
        })
    }
    const onSubmit = (e) => {
        e.preventDefault();
        saveTherapistMenu(methods.getValues())
        methods.reset()
        setOpen(false);
        fetchData();
    }

    const fetchData = async () => {
        setMenus(await getTherapistProfileMenus())
    }
    const [menus, setMenus] = useState([])
    useEffect(() => {
        fetchData()
    }, [])

    return (
        <>
            <AppBar />
            <Container maxWidth="sm">
                <List sx={{ width: '100%' }}>
                    {menus.length > 0 && menus.map(menu => [
                        <ListItem key={menu.id}
                            secondaryAction={
                                <IconButton edge="end" onClick={() => handleCreateOpen(menu.id)}>
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
                                    <>
                                        <IconButton edge="end" aria-label="update" onClick={() => handleUpdateOpen(m)}>
                                            <CreateIcon />
                                        </IconButton>
                                        <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteOpen(m.id)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </>
                                }
                            >
                                {m.treatmentTime}分 {m.price}円
                            </ListItem>
                        )) : [])
                    ]
                    )}
                </List>
                <FormProvider {...methods}>
                    <MenuCreateDialog menus={menus} open={open} onSubmit={onSubmit} onClose={onClose} />
                </FormProvider>
            </Container>
            <BottomBar />
        </>
    )
}