"use client"

import BottomBar from "@/app/components/BottomBar";
import { Box, Container, Rating, Typography } from '@mui/material';
import Image from "next/image";
import { useParams } from 'next/navigation';
import { useEffect, useState } from "react";
import AppBar from '../../components/AppBar';

export default function TherapistPage() {
    const params = useParams();
    const [therapist, setTherapist] = useState({})
    useEffect(() => {
        fetch(`/api/therapists/${params.id}`)
            .then((res) => res.json())
            .then((data) => {
                setTherapist(data.therapist)
            })
    }, [])
    return (
        <>
            <AppBar />
            <Container maxWidth="sm">
                <Box sx={{ mb: 1, mt: 1 }}>
                    <Image sx={{ height: "auto" }}
                        src="/paella.jpg"
                        width={500}
                        height={300}
                        priority={false}
                        alt="" />
                    <h1>{therapist.name}</h1>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        {therapist.comment}
                    </Typography>
                    <Rating name="half-rating"
                        precision={0.5}
                        size="small" value={4.5} />
                    <div sx={{ ml: 2 }}>(4.5)</div>
                    {therapist.menus?.map((menu, idx) => (
                        <Typography key={idx}>
                            {menu.menu.name}:{menu.treatmentTime}min {menu.price}円
                        </Typography>
                    ))}
                </Box>
            </Container >
            <BottomBar />
        </>
    );
}
