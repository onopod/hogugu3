"use client"

import { AppBar, BottomBar, ReviewHeader, ReviewList } from "@/app/components";
import { Container } from "@mui/material";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getTherapist, getReviews } from "@/app/actions";

export default function ReviewPage() {
    const params = useParams();
    const [therapist, setTherapist] = useState({})
    const [reviews, setReviews] = useState([])

    useEffect(() => {
        const fetchTherapist = async () => {
            setTherapist(await getTherapist(Number(params.therapistId)));
        }
        fetchTherapist();

        const fetchReviews = async () => {
            setReviews(await getReviews(Number(params.therapistId)))
        }
        fetchReviews();
    }, [params.therapistId])
    return (
        <>
            <AppBar />
            <Container maxWidth="sm">
                <ReviewHeader therapist={therapist} />
                <ReviewList reviews={reviews} />
            </Container>
            <BottomBar />
        </>
    )
}