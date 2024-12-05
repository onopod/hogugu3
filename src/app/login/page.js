"use client"
import { Button, Container, FormControl, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import AppBar from "../components/AppBar";
export default function Login() {
    const { register, handleSubmit } = useForm();
    const onSubmit = data => console.log(data)

    return (
        <>
            <AppBar />
            <Container maxWidth="sm">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <FormControl>
                        <TextField id="mail" {...register('mail')} label="メールアドレス" />
                        <TextField id="password" {...register('password')} type="password" label="パスワード" />
                        <Button type="submit">ログイン</Button>
                    </FormControl>
                </form>
            </Container>
        </>
    )
        ;
}