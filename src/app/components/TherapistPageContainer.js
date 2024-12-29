"use client"

import { getReviews, getTherapist, getTherapistMenus, setHistory } from "@/app/actions";
import BookingForm from "@/app/components/BookingForm";
import Menus from "@/app/components/Menus";
import Reviews from "@/app/components/Reviews";
import { Box, Button, FormControl, Tab, Tabs } from '@mui/material';
import { useSession } from "next-auth/react";
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from "react";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";

export default function TherapistPageContainer() {
    const { data: session } = useSession();
    const router = useRouter();
    const params = useParams();

    const [therapist, setTherapist] = useState({})
    const [reviews, setReviews] = useState([])
    const [therapistMenus, setTherapistMenus] = useState([])

    useEffect(() => {
        const actions = async () => {
            const id = Number(params.id);
            setTherapistMenus(await getTherapistMenus(id))
            setTherapist(await getTherapist(id));
            setReviews(await getReviews(id))
            if (session?.user?.role == "user") {
                await setHistory(id)
            }
        }
        actions();
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
            <Box sx={{ mb: 1, mt: 1 }}>
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
                        <Menus therapistMenus={therapistMenus} />
                    </SwiperSlide>
                    <SwiperSlide>
                        <Reviews reviews={reviews} more={true} />
                        <FormControl fullWidth>
                            <Button onClick={() => router.push(`/therapist/${therapist.id}/review`)}>
                                もっと見る
                            </Button>
                        </FormControl>
                    </SwiperSlide>
                </Swiper>
                {session?.user?.role == "user" ? <BookingForm therapist={therapist} therapistMenus={therapistMenus} /> : ""}
            </Box>

        </>
    );
}