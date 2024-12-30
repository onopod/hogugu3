import AppBar from "@/app/components/AppBar";
import { Container, Toolbar, Typography } from "@mui/material";

export default function HowToUse() {
    return (
        <>
            <AppBar />
            <Container maxWidth="sm">
                <Toolbar><Typography variant="h5">使い方</Typography></Toolbar>
            </Container >
        </>
    )
}
