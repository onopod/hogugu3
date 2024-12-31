import AppBar from "@/app/components/t/AppBar";
import BottomBar from "@/app/components/t/BottomBar";
import Sales from "@/app/components/t/Sales";
import { Container } from "@mui/material";
export default async function SalesPage() {

    return (
        <>
            <AppBar />
            <Container maxWidth="sm" sx={{ mt: 1 }}>
                <Sales />
                <BottomBar />
            </Container>
        </>
    )
}