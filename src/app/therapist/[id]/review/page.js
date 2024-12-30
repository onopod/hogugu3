import { getReviews, getTherapist } from "@/app/actions";
import { AppBar, BottomBar, Reviews, Therapist } from "@/app/components";
import { Container } from "@mui/material";

export default async function ReviewPage({ params }) {
    const id = Number((await (params)).id)
    const therapist = await getTherapist(id);
    const reviews = await getReviews(id);
    return (
        <>
            <AppBar />
            <Container maxWidth="sm">
                <Therapist therapist={therapist} />
                <Reviews reviews={reviews} />
            </Container>
            <BottomBar />
        </>
    )
}