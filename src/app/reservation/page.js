"use client";
import { AppBar, BottomBar } from "@/app/components";
import { Avatar, Box, Container, Stack, Tab, Tabs, Typography } from "@mui/material";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import "swiper/css"; // Swiper のスタイルをインポート
import { Swiper, SwiperSlide } from "swiper/react"; // Swiper コンポーネントをインポート

function a11yProps(index) {
    return {
        id: `statusId-${index}`,
        "aria-controls": `statusId-${index}`,
    };
}

export default function ReservationPage() {
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

    const [statuses, setStatuses] = useState([]);
    const [reservations, setReservations] = useState([]);

    useEffect(() => {
        fetch("/api/statuses")
            .then((req) => req.json())
            .then((data) => {
                setStatuses(data.statuses);
            });
    }, []);

    useEffect(() => {
        fetch("/api/reservations")
            .then((req) => req.json())
            .then((data) => {
                setReservations(data.reservations);
            });
    }, []);

    return (
        <>
            <AppBar />
            <Container maxWidth="sm">
                <Box sx={{ width: "100%" }}>
                    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                        <Tabs
                            variant="fullWidth"
                            value={value}
                            onChange={handleChange}
                            aria-label="statusId"
                        >
                            {statuses.map((status, index) => (
                                <Tab
                                    key={status.id}
                                    label={status.name}
                                    {...a11yProps(index)}
                                />
                            ))}
                        </Tabs>
                    </Box>
                    {/* Swiper を使用 */}
                    <Swiper
                        onSlideChange={(swiper) => setValue(swiper.activeIndex)}
                        onSwiper={onSwiper}
                        spaceBetween={10}
                        slidesPerView={1}
                    >
                        {statuses.map((status, index) => (
                            <SwiperSlide key={status.id}>
                                <Box role="tabpanel" id={`statusId-${index}`} sx={{ p: 3 }}>
                                    <Stack spacing={2} sx={{ mt: 1 }}>
                                        {reservations &&
                                            reservations
                                                .filter(
                                                    (reservation) =>
                                                        reservation.statusId === status.id
                                                )
                                                .map((reservation) => (
                                                    <Stack
                                                        key={reservation.id}
                                                        direction="row"
                                                        spacing={2}
                                                    >
                                                        <Box>
                                                            <Avatar
                                                                alt={
                                                                    reservation.therapistMenu
                                                                        .therapist.name
                                                                }
                                                                src="/avatar.jpg"
                                                            />
                                                        </Box>
                                                        <Box>
                                                            <Typography>
                                                                {
                                                                    reservation.therapistMenu
                                                                        .therapist.name
                                                                }
                                                            </Typography>
                                                            <Typography>
                                                                {format(
                                                                    new Date(reservation.startDt),
                                                                    "yyyy/MM/dd kk:mm"
                                                                )}
                                                                から
                                                                {
                                                                    reservation.therapistMenu
                                                                        .treatmentTime
                                                                }
                                                                分{" "}
                                                                {
                                                                    reservation.therapistMenu.menu
                                                                        .name
                                                                }
                                                            </Typography>
                                                        </Box>
                                                    </Stack>
                                                ))}
                                    </Stack>
                                </Box>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </Box>
            </Container>
            <BottomBar />
        </>
    );
}
