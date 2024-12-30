import AppBar from "@/app/components/AppBar";
import { Container, Toolbar, Typography } from "@mui/material";

export default function News() {
    return (
        <>
            <AppBar />
            <Container maxWidth="sm">
                <Toolbar><Typography variant="h5">お知らせ一覧</Typography></Toolbar>
            </Container >
        </>
    )
}
