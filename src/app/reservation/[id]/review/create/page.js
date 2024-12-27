"use client";
import { getReservation, postReview } from "@/app/actions";
import { AppBar, BottomBar } from "@/app/components";
import { FormControl, Button, Rating, Avatar, Box, Container, Stack, Tab, Tabs, Typography, TextField, InputLabel, FormHelperText } from "@mui/material";
import { format } from "date-fns";
import { Controller, useForm } from "react-hook-form";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ReviewPage() {
    const router = useRouter();
    const params = useParams();
    const [reservation, setReservation] = useState([]);
    const { control, register, reset, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            rate: 0,
            comment: ""
        }
    });

    const fetchData = async () => {
        const reservation = await getReservation(Number(params.id));
        if (reservation?.review) {
            reset({
                rate: reservation.review.rate,
                comment: reservation.review.comment
            })
        }
        setReservation(reservation);
    }

    useEffect(() => {
        fetchData();
    }, []);

    const onSubmit = (data) => {
        const saveReview = async (data) => {
            await postReview({
                ...(reservation?.review ? { reviewId: Number(reservation.review.id) } : {}),
                reservationId: Number(params.id),
                rate: Number(data.rate),
                comment: data.comment
            })
            router.push(`/reservation/${params.id}/review`)
        }
        saveReview(data)
        fetchData();
    }

    console.log(reservation);
    return (
        <>
            <AppBar />
            <Container maxWidth="sm">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Stack spacing={1} sx={{ my: 2, width: "100%" }}>
                        <FormControl fullWidth >
                            レート：
                            <Controller
                                name="rate"
                                control={control}
                                rules={{ required: "レートを選択してください" }}
                                render={({ field }) => (
                                    <Rating
                                        {...field}
                                        value={field.value}
                                        onChange={(_, newValue) => field.onChange(newValue)}
                                    />
                                )}
                            />
                            {errors.rate && (<FormHelperText>{errors.rate.message}</FormHelperText>)}
                        </FormControl>
                        <FormControl fullWidth >
                            コメント：
                            <TextField {...register("comment", { required: "コメントを入力してください" })} />
                            {errors.comment && (<FormHelperText>{errors.comment.message}</FormHelperText>)}
                        </FormControl>
                        <FormControl fullWidth>
                            <Button variant="standard" type="submit">投稿</Button>
                        </FormControl>
                    </Stack>
                </form>
            </Container>
            <BottomBar />
        </>
    );
}
