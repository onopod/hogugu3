import { AppBar, BottomBar } from "@/app/components";
import Therapist from "@/app/components/Therapist";
import TherapistPageContainer from "@/app/components/TherapistPageContainer";
import { Container } from "@mui/material";
import { Suspense } from "react";


export default async function TherapistPage({ params }) {
    const { id } = await (params)
    console.log("is server?")
    return (
        <>
            <AppBar />
            <Container maxWidth="sm">
                <Suspense fallback="loading">
                    <Therapist id={Number(id)} />
                </Suspense>

                <TherapistPageContainer />
            </Container >
            <BottomBar />
        </>

    )
}