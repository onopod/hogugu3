import AppBar from "@/app/components/t/AppBar"
import BottomBar from "@/app/components/t/BottomBar"
import { Container } from "@mui/material"
import PhotoList from "@/app/components/t/PhotoList"

export default function PhotoPage() {
    return (
        <>
            <AppBar />
            <Container maxWidth="sm">
                <PhotoList />
            </Container>
            <BottomBar />
        </>

    )
}