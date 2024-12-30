import { AppBar, BottomBar, Reviews, Therapist } from "@/app/components";
import { Container } from "@mui/material";

export default async function ReviewPage({ params }) {
    const id = Number((await (params)).id)
    return (
        <>
            <AppBar />
            <Container maxWidth="sm">
                <Therapist id={id} />
                <Reviews id={id} />
            </Container>
            <BottomBar />
        </>
    )
}