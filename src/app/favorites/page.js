"use client"

import { getFavorites, getHistories } from "@/app/actions";
import { AppBar, BottomBar, Favorites, Histories } from "@/app/components";
import { Box, Container, Tab, Tabs } from "@mui/material";
import { useEffect, useState } from "react";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";

export default function ProfilePage() {
    const [favorites, setFavorites] = useState([]);
    const [histories, setHistories] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            setFavorites(await getFavorites())
            setHistories(await getHistories())
        }
        fetchData();
    }, [])

    const [swiper, setSwiper] = useState(null);
    const [value, setValue] = useState(0);

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
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                    <Tabs
                        variant="fullWidth"
                        value={value}
                        onChange={handleChange}
                        aria-label="therapistSwiper"
                    >
                        <Tab id="therapistSwiper-1" label="お気に入り" aria-controls="therapistSwiper-1" />
                        <Tab id="therapistSwiper-2" label="閲覧履歴" aria-controls="therapistSwiper-2" />
                    </Tabs>
                </Box>
                <Swiper
                    onSlideChange={(swiper) => setValue(swiper.activeIndex)}
                    onSwiper={onSwiper}
                    spaceBetween={10}
                    slidesPerView={1}
                >
                    <SwiperSlide>
                        <Favorites favorites={favorites} />
                    </SwiperSlide>
                    <SwiperSlide>
                        <Histories histories={histories} />
                    </SwiperSlide>
                </Swiper>
            </Container>
            <BottomBar />
        </>
    )
}