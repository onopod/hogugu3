"use client";
import { changeReservationStatusToCancel, checkoutStripe, getReservations, getStatuses } from "@/app/actions";
import { AppBar, BottomBar } from "@/app/components";
import { Avatar, Box, Button, Container, Stack, Tab, Tabs, Typography } from "@mui/material";
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
    const router = useRouter();
    const [statuses, setStatuses] = useState([]);
    const [reservations, setReservations] = useState([]);

    const fetchData = async () => {
        setStatuses(await getStatuses());
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
    const payReservation = async (reservationId) => {

        const stripeURL = await checkoutStripe(reservationId)
        window.location = stripeURL
    }
    const cancelReservation = (reservationId) => {
        changeReservationStatusToCancel(reservationId)
        fetchData()
    }
    return (
        <>
            <AppBar />
            <Container maxWidth="sm">
                <Box sx={{ width: "100%" }}>
                    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                        <Tabs
                            value={value}
                            variant="scrollable"
                            scrollButtons
                            allowScrollButtonsMobile
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
                                                                alt={reservation?.therapist?.name}
                                                                src={reservation?.therapist?.imageFileName ? `/therapistImg/${reservation.therapist.id}/${reservation.therapist.imageFileName}` : ""}
                                                            />
                                                        </Box>
                                                        <Box>
                                                            <Typography>{reservation.therapist.name}</Typography>
                                                            <Typography>
                                                                {format(
                                                                    new Date(reservation.startDt),
                                                                    "yyyy/MM/dd kk:mm"
                                                                )}
                                                                から
                                                                {reservation.therapistMenu.treatmentTime}
                                                                分{" "}
                                                                {reservation.therapistMenu.price}円
                                                            </Typography>
                                                        </Box>
                                                        {reservation?.statusId == 2 &&
                                                            <Box>
                                                                <Button onClick={() => payReservation(reservation.id)}>
                                                                    支払い
                                                                </Button>
                                                            </Box>
                                                        }
                                                        {[1, 2].includes(reservation?.statusId) &&
                                                            <Box>
                                                                <Button onClick={() => cancelReservation(reservation.id)}>
                                                                    キャンセル
                                                                </Button>
                                                            </Box>
                                                        }
                                                        {[4].includes(reservation?.statusId) &&
                                                            <Box>
                                                                {reservation?.review ?
                                                                    <Button onClick={() => router.push(`/reservation/${reservation.id}/review`)}>
                                                                        レビューを確認
                                                                    </Button>
                                                                    : <Button onClick={() => router.push(`/reservation/${reservation.id}/review/create`)}>
                                                                        レビューを投稿!
                                                                    </Button>
                                                                }
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
