"use client"

import { getTherapist, getTherapistMenus, postMessage, postReservation } from "@/app/actions";
import { Button, FormControl, FormHelperText, FormLabel, ListSubheader, MenuItem, Select } from '@mui/material';
import { format } from "date-fns";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
export default function BookingForm({ id }) {
    const router = useRouter();
    const [therapist, setTherapist] = useState({})
    const [therapistMenus, setTherapistMenus] = useState([])

    useEffect(() => {
        const actions = async () => {
            setTherapistMenus(await getTherapistMenus(id))
            setTherapist(await getTherapist(id));
        }
        actions();
    }, [id])


    const { control, handleSubmit, reset, setValue, register, formState: { errors } } = useForm({
        defaultValues: {
            startDt: "",
            therapistMenuId: ""
        }
    });

    const onSubmit = data => {
        // 予約を登録
        const save = async (data) => {
            await postReservation({
                ...data,
                therapistId: therapist.id
            });
            const message = {
                therapistId: therapist.id,
                message: `セラピストへ予約リクエストを送信しました。
予約日時：${format(data.startDt, "yyyy/MM/dd kk:mm")}
メニュー：${therapist.menus.filter(menu => menu.id == data.therapistMenuId)[0].menu.name}
                `,
                messageStatusId: 3
            }
            await postMessage(message);
            router.push("/reservation")
        }
        save(data);
    };
    console.log("booking form")
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl fullWidth error={!!errors.therapistMenuId}>
                <FormLabel>メニュー</FormLabel>
                <Controller
                    name="therapistMenuId"
                    control={control}
                    rules={{ required: "メニューを選択してください。" }}
                    render={({ field }) => (
                        <Select
                            id="therapistMenuId"
                            {...field}
                            value={field.value}
                            onChange={(e) => {
                                field.onChange(e.target.value);
                                setValue("therapistMenuId", e.target.value);
                            }}
                            label="therapistMenuId"
                        >
                            {therapistMenus?.length > 0 ? therapistMenus.flatMap((menu) => [
                                <ListSubheader key={menu.id}>{menu.name}</ListSubheader>,
                                ...menu.therapistMenus.map((m) => (
                                    <MenuItem key={`_${m.id}`} value={m.id}>
                                        {m.treatmentTime}分 {m.price}円
                                    </MenuItem>
                                ))
                            ]) : ""}
                        </Select>
                    )}
                />
                {errors.therapistMenuId && (
                    <FormHelperText>{errors.therapistMenuId.message}</FormHelperText>
                )}
            </FormControl>

            <FormControl fullWidth error={!!errors.startDt}>
                <FormLabel>予約時間</FormLabel>
                <input
                    type="datetime-local"
                    {...register("startDt", { required: "予約時間を入力してください。" })}
                />
                {errors.startDt && (
                    <FormHelperText>{errors.startDt.message}</FormHelperText>
                )}
            </FormControl>

            <Button type="submit">予約リクエスト</Button>
            <Button onClick={() => reset()}>リセット</Button>
        </form>
    );
}
