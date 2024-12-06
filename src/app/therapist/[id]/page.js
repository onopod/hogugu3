"use client"

import BottomBar from "@/app/components/BottomBar";
import { Container, Rating, Typography } from '@mui/material';
import Image from "next/image";
import { useParams } from 'next/navigation';
import { useEffect, useState } from "react";
import AppBar from '../../components/AppBar';

export default function TherapistPage() {
    const params = useParams();
    const [therapist, setTherapist] = useState({})
    const [menus, setMenus] = useState([]);
    useEffect(() => {
        fetch(`/api/therapists/${params.id}`)
            .then((data) => data.json())
            .then((therapist) => {
                setTherapist(therapist)
                setMenus(therapist.menus)
            })
    })
    return (
        <>
            <AppBar />
            <Container maxWidth="sm">
                <Image
                    src="/paella.jpg"
                    width={500}
                    height={300}
                    alt="" />
                <h1>{therapist.name}</h1>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {therapist.comment}
                </Typography>
                <Rating name="half-rating"
                    precision={0.5}
                    size="small" value={4.5} />
                <div sx={{ ml: 2 }}>(4.5)</div>
                {menus.map((menu, idx) => (
                    <>
                        <Typography key={idx}>{menu.menu.name}:{menu.treatmentTime}min {menu.price}円</Typography>
                    </>
                ))}
            </Container >
            <BottomBar />
        </>
    );
}
