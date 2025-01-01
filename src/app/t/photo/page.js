import AppBar from "@/app/components/t/AppBar"
import BottomBar from "@/app/components/t/BottomBar"
import { Container } from "@mui/material"
import PhotoList from "@/app/components/t/PhotoList"
import PhotoRegister from "@/app/components/t/PhotoRegister"

export default function PhotoPage() {
    return (
        <>
            <AppBar />
            <Container maxWidth="sm">
                <PhotoRegister />
                <PhotoList />
            </Container>
            <BottomBar />
        </>

    )
}