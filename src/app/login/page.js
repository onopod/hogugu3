"use client"
import { AppBar } from "@/app/components";
import { Button, Container, FormControl, Stack, TextField } from "@mui/material";
import { useRouter } from 'next/navigation';
import { useForm } from "react-hook-form";
export default function Login() {
    const router = useRouter();

    const { register, handleSubmit } = useForm();
    const onSubmit = data => {
        fetch('/api/users', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then((res) => res.json())
            .then((data) => {
                router.push("/login")
            })
    }

    return (
        <>
            <AppBar />
            <Container maxWidth="sm">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <FormControl fullWidth>
                        <Stack spacing={2} sx={{ mt: 1, mb: 1 }}>
                            <TextField id="mail" {...register('mail')} placeholder="メールアドレス" />
                            <TextField id="password" {...register('password')} type="password" placeholder="パスワード" />
                            <Button type="submit" variant="outlined" fullWidth>新規登録</Button>
                        </Stack>
                    </FormControl>
                </form>
            </Container>
        </>
    )
        ;
}