"use server"

import { setHistory } from "@/app/actions";
import { AppBar, BookingForm, BottomBar } from "@/app/components";
import Menus from "@/app/components/Menus";
import Reviews from "@/app/components/Reviews";
import Therapist from "@/app/components/Therapist";
import TherapistPageContainer from "@/app/components/TherapistPageContainer";
import { Container } from "@mui/material";

export default async function TherapistPage({ params }) {
    const id = Number((await (params)).id)
    await setHistory(id)

    return (
        <>
            <AppBar />
            <Container maxWidth="sm">
                <Therapist id={id} />
                <TherapistPageContainer
                    menus={<Menus id={id} />}
                    reviews={
                        <Reviews id={id} more={true} />
                    } />
                <BookingForm id={id} />
            </Container >
            <BottomBar />
        </>

    )
}