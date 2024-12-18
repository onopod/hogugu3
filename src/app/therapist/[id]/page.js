"use client"

import { AppBar, BookingForm, BottomBar, Review } from "@/app/components";
import { Box, Container, Rating, Tab, Tabs, Typography } from '@mui/material';
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useParams } from 'next/navigation';
import { useEffect, useState } from "react";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";

export default function TherapistPage() {
    const { data: session } = useSession();
    const params = useParams();
    const [therapist, setTherapist] = useState({})
    const [reviews, setReviews] = useState([])
    useEffect(() => {
        fetch(`/api/therapists/${params.id}`)
            .then((res) => res.json())
            .then((data) => {
                setTherapist(data.therapist)
                const reviews = data.therapist.menus?.map(
                    menu => menu.reservations
                ).map(
                    reservations => reservations.filter(
                        reservation => reservation?.review
                    ).map(
                        reservation => reservation?.review
                    )
                ).filter(review => review?.length > 0).flat();
                setReviews(reviews)
            })
            .then(() => {
                // 閲覧履歴
                if (session) {
                    fetch(`/api/histories/${params.id}`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" }
                    })
                }
            });
    }, [params.id, session])

    const [value, setValue] = useState(0);
    const [swiper, setSwiper] = useState(null);

    const onSwiper = (currentSwiper) => {
        const swiperInstance = currentSwiper;
        setSwiper(swiperInstance);
    };

    const handleChange = (_, newValue) => {
        swiper?.slideTo(newValue)
        setValue(newValue);
    };
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
                    {therapist.reservations ?
                        <Box>
                            <span>返答率 {therapist.reservations.length == 0 ?
                                "-" :
                                `${(therapist.reservations.filter(reservation => reservation.replyDt != null).length / therapist.reservations.length * 100).toFixed(0)}%`
                            }</span><span>返答時間 {therapist.reservations.length == 0 ?
                                "-" :
                                `${(therapist.reservations.filter(reservation => reservation.replyDt != null).map(reservation => new Date(reservation.replyDt) - new Date(reservation.created)).reduce((acc, curr, _, arr) => acc + curr / arr.length, 0) / (1000 * 60))}分`
                            }</span>
                            <span>出発地 {therapist.prefecture ? therapist.prefecture.name : "-"}／{therapist.city || "-"}</span>
                            <span>施術歴 {therapist.workYear ? therapist.workYear : "-"}年</span>
                        </Box>
                        : ""}
                    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                        <Tabs
                            variant="fullWidth"
                            value={value}
                            onChange={handleChange}
                            aria-label="therapistSwiper"
                        >
                            <Tab
                                id="therapistSwiper-1"
                                label="メニュー"
                                aria-controls="therapistSwiper-1"
                            />
                            <Tab
                                id="therapistSwiper-2"
                                label="レビュー"
                                aria-controls="therapistSwiper-2"
                            />
                        </Tabs>
                    </Box>

                    <Swiper
                        onSlideChange={(swiper) => setValue(swiper.activeIndex)}
                        onSwiper={onSwiper}
                        spaceBetween={10}
                        slidesPerView={1}
                    >
                        <SwiperSlide>
                            {therapist.menus?.map((menu, idx) => (
                                <Typography key={idx}>
                                    {menu.menu.name}:{menu.treatmentTime}min {menu.price}円
                                </Typography>
                            ))}
                        </SwiperSlide>
                        <SwiperSlide>
                            {reviews.map((review) => (
                                <Review key={review.id} review={review} />
                            ))}
                        </SwiperSlide>
                    </Swiper>
                    {session ? <BookingForm therapist={therapist} /> : ""}
                </Box>
            </Container >
            <BottomBar />
        </>
    );
}