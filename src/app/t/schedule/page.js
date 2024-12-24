"use client"

import { deleteSchedule, getSchedules, postSchedule } from "@/app/actions";
import { AppBar, BottomBar } from "@/app/components/t";
import { AddIcon, CreateIcon, DeleteIcon } from "@/app/icons";
import { Button, Container, Dialog, DialogContent, DialogTitle, FormControl, IconButton, List, ListItem, ListItemText, TextField } from "@mui/material";
import { addDays, addHours, format } from "date-fns";
import { ja } from 'date-fns/locale';
import { useEffect, useState } from "react";
import { FormProvider, useForm, useFormContext } from 'react-hook-form';

function ScheduleCreateDialog(props) {
    const { onClose, onSubmit, open } = props;
    const { register, reset, getValues } = useFormContext({
        defaultValues: {
            treatmentTime: ""
        }
    });
    const handleClose = (onClose) => {
        reset();
        onClose();
    };
    return (
        <Dialog onClose={() => handleClose(onClose)} open={open}>
            <DialogTitle>{getValues("id") ? "更新" : "新規登録"}</DialogTitle>
            <DialogContent>
                <form onSubmit={onSubmit}>
                    <FormControl fullWidth>
                        開始日時：<TextField id="startDt" type="datetime-local" {...register("startDt")} />
                    </FormControl>
                    <FormControl fullWidth>
                        終了日時：<TextField id="endDt" type="datetime-local" {...register("endDt")} />
                    </FormControl>
                    <Button type="submit">登録</Button>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default function SchedulePage() {
    const [open, setOpen] = useState(false);
    const methods = useForm();


    const handleCreateOpen = (d) => {
        methods.setValue("startDt", `${format(d, "yyyy-MM-dd")} ${format(new Date(), "kk:mm")}`)
        methods.setValue("endDt", `${format(d, "yyyy-MM-dd")} ${format(addHours(new Date(), 1), "kk:mm")}`)
        setOpen(true);
    };
    const handleUpdateOpen = (schedule) => {
        methods.setValue("id", schedule.id)
        methods.setValue("startDt", format(schedule.startDt, "yyyy-MM-dd kk:mm"))
        methods.setValue("endDt", format(schedule.endDt, "yyyy-MM-dd kk:mm"))
        setOpen(true);
    }
    const handleDeleteOpen = (id) => {
        const deleteData = async (id) => {
            await deleteSchedule(id)
        }
        deleteData(id)
        fetchData()
    }

    const onClose = () => {
        setOpen(false);
    };

    const saveSchedule = async (data) => {
        await postSchedule({
            ...(data.id ? { id: data.id } : {}),
            startDt: data.startDt,
            endDt: data.endDt
        })
    }
    const onSubmit = (e) => {
        e.preventDefault();
        saveSchedule(methods.getValues())
        methods.reset()
        setOpen(false);
        fetchData();
    }

    const fetchData = async () => {
        setSchedules(await getSchedules())
    }
    const [schedules, setSchedules] = useState([])
    useEffect(() => {
        fetchData()
    }, [])
    const dates = [...Array(10)].map((_, i) => addDays(new Date(), i));


    return (
        <>
            <AppBar />
            <Container maxWidth="sm">
                <List sx={{ width: '100%' }}>
                    {dates.map((d) => [
                        <ListItem key={d}
                            secondaryAction={
                                <IconButton edge="end" onClick={() => handleCreateOpen(d)}>
                                    <AddIcon />
                                </IconButton>
                            }
                        >
                            <ListItemText primary={format(d, "yyyy年M月d日 (eee)", { locale: ja })} />
                        </ListItem>
                        ,
                        ...(schedules.length > 0 && schedules.filter(schedule => format(schedule.startDt, "yyyy/MM/dd") == format(d, "yyyy/MM/dd"))?.length > 0 ?
                            schedules.filter(schedule => format(schedule.startDt, "yyyy/MM/dd") == format(d, "yyyy/MM/dd")).map((s) => (
                                <ListItem key={`_${s.id}`}
                                    value={s.id}
                                    secondaryAction={
                                        <>
                                            <IconButton edge="end" aria-label="update" onClick={() => handleUpdateOpen(s)}>
                                                <CreateIcon />
                                            </IconButton>
                                            <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteOpen(s.id)}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </>
                                    }
                                >
                                    {format(s.startDt, format(d, "yyyy/MM/dd") == format(s.startDt, "yyyy/MM/dd") ? "kk:mm" : "yyyy/MM/dd kk:mm")} → {format(s.endDt, format(d, "yyyy/MM/dd") == format(s.endDt, "yyyy/MM/dd") ? "kk:mm" : "yyyy/MM/dd kk:mm")}
                                </ListItem>
                            )) : [])
                    ]
                    )}
                </List>
                <FormProvider {...methods}>
                    <ScheduleCreateDialog open={open} onSubmit={onSubmit} onClose={onClose} />
                </FormProvider>
            </Container>
            <BottomBar />
        </>
    )
}