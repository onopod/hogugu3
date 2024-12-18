"use client"

import { AppBar, BottomBar, ReviewHeader, ReviewList } from "@/app/components";
import { Container } from "@mui/material";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ReviewPage() {
    const [therapist, setTherapist] = useState({})
    const [reviews, setReviews] = useState([])
    const params = useParams();
    useEffect(() => {
        fetch(`/api/therapists/${params.therapistId}`)
            .then(res => res.json())
            .then(data => setTherapist(data.therapist))
    }, [params])
    useEffect(() => {
        fetch(`/api/reviews/${params.therapistId}`)
            .then(res => res.json())
            .then(data => setReviews(data.reviews))
    }, [params])

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