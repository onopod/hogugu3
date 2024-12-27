"use client";
import { getReservation } from "@/app/actions";
import { AppBar, BottomBar } from "@/app/components";
import { FormControl, Button, Rating, Avatar, Box, Container, Stack, Tab, Tabs, Typography, TextField, InputLabel, FormHelperText } from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ReviewPage() {
    const router = useRouter();
    const params = useParams();
    const [reservation, setReservation] = useState([]);
    const fetchData = async () => {
        setReservation(await getReservation(Number(params.id)));
    }

    useEffect(() => {
        fetchData();
    }, []);
    console.log("reservation is")
    console.dir(reservation)

    return (
        <>
            <AppBar />
            <Container maxWidth="sm">
                <Stack spacing={1} sx={{ my: 2, width: "100%" }}>
                    <Typography>
                        レート：<Rating value={reservation?.review?.rate || 0} readonly />
                    </Typography>
                    <Typography>
                        コメント：{reservation?.review?.comment}
                    </Typography>
                    <FormControl>
                        <Button variant="standard"
                            type="submit"
                            onClick={() => router.push(`/reservation/${params.id}/review/create`)}
                        >編集</Button>
                    </FormControl>
                </Stack>
            </Container>
            <BottomBar />
        </>
    );
}
