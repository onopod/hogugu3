"use client"

import { getReviews, getTherapist } from "@/app/actions";
import { AppBar, BottomBar, Reviews, Therapist } from "@/app/components";
import { Container } from "@mui/material";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ReviewPage() {
    const params = useParams();
    const [therapist, setTherapist] = useState({})
    const [reviews, setReviews] = useState([])

    useEffect(() => {
        const fetchTherapist = async () => {
            setTherapist(await getTherapist(Number(params.id)));
        }
        fetchTherapist();

        const fetchReviews = async () => {
            setReviews(await getReviews(Number(params.id)))
        }
        fetchReviews();
    }, [params])
    return (
        <>
            <AppBar />
            <Container maxWidth="sm">
                <Therapist therapist={therapist} />
                <Reviews reviews={reviews} />
            </Container>
            <BottomBar />
        </>
    )
}