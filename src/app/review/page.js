"use client";
import { getReservations } from "@/app/actions";
import { AppBar, BottomBar } from "@/app/components";
import { Button, Rating, Avatar, Box, Container, Stack, Tab, Tabs, Typography } from "@mui/material";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";

function a11yProps(index) {
    return {
        id: `statusId-${index}`,
        "aria-controls": `statusId-${index}`,
    };
}

export default function ReservationPage() {
    const router = useRouter()
    const statuses = ["未レビュー", "レビュー済"];
    const [reservations, setReservations] = useState([]);

    const fetchData = async () => {
        setReservations(await getReservations());
    }

    useEffect(() => {
        fetchData();
    }, []);

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
                <Box sx={{ width: "100%" }}>
                    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                        <Tabs
                            value={value}
                            variant="fullWidth"
                            scrollButtons
                            allowScrollButtonsMobile
                            onChange={handleChange}
                            aria-label="statusId"
                        >
                            {statuses.map((status, index) => (
                                <Tab
                                    key={index}
                                    label={status}
                                    {...a11yProps(index)}
                                />
                            ))}
                        </Tabs>
                    </Box>
                    <Swiper
                        onSlideChange={(swiper) => setValue(swiper.activeIndex)}
                        onSwiper={onSwiper}
                        spaceBetween={10}
                        slidesPerView={1}
                    >
                        {statuses.map((status, index) => (
                            <SwiperSlide key={index}>
                                <Box role="tabpanel" id={`statusId-${index}`} sx={{ p: 3 }}>
                                    <Stack spacing={2} sx={{ mt: 1 }}>
                                        {reservations &&
                                            reservations
                                                .filter(reservation =>
                                                    (reservation?.review ? 1 : 0) == index
                                                )
                                                .map(r => (
                                                    <Stack
                                                        key={r.id}
                                                        direction="row"
                                                        spacing={2}
                                                    >
                                                        <Box>
                                                            <Avatar
                                                                alt={r?.therapist?.name}
                                                                src={r?.therapist?.therapistView?.imageFilePath}
                                                            />
                                                        </Box>
                                                        <Box>
                                                            <Typography>{r.therapist.name}</Typography>
                                                            <Typography>
                                                                {format(
                                                                    new Date(r.startDt),
                                                                    "yyyy/MM/dd kk:mm"
                                                                )}
                                                                から
                                                                {r.therapistMenu.treatmentTime}
                                                                分{" "}
                                                                {r.therapist.name}
                                                            </Typography>
                                                        </Box>
                                                        {r?.review ?
                                                            <>
                                                                <Box>
                                                                    <Typography>{r.review.comment}</Typography>
                                                                    <Rating value={r.review.rate} readOnly />
                                                                </Box>
                                                                <Box>
                                                                    <Button onClick={() => router.push(`/reservation/${r.id}/review`)}>詳細</Button>
                                                                </Box>
                                                            </>
                                                            :
                                                            <Box>
                                                                <Button onClick={() => router.push(`/reservation/${r.id}/review/create`)}>投稿</Button>
                                                            </Box>
                                                        }
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
