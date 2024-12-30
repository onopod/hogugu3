"use client"

import { Box, Tab, Tabs } from '@mui/material';
import { useState } from "react";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";

export default function TherapistPageContainer({ menus, reviews }) {
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
        <Box sx={{ my: 1 }}>
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
                    {menus}
                </SwiperSlide>
                <SwiperSlide>
                    {reviews}
                </SwiperSlide>
            </Swiper>
        </Box>
    );
}