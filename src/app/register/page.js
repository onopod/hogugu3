"use client"

import { AppBar } from "@/app/components";
import { Button, Container, FormControl, FormHelperText, Stack, TextField } from "@mui/material";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';
import { useForm } from "react-hook-form";

export default function Register() {
    const { data: session } = useSession();
    const router = useRouter();

    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = async data => {
        try {
            await fetch('/api/users', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            })
            await signIn("credentials", {
                redirect: false,
                mail: data.mail,
                password: data.password,
            })
            router.push("/")
        } catch (err) {
            console.dir(err)
        }
    }

    return (
        <>
            <AppBar />
            <Container maxWidth="sm">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <FormControl fullWidth>
                        <Stack spacing={2} sx={{ mt: 1, mb: 1 }}>
                            <TextField id="name" {...register('name', { required: "お名前を入力してください。" })} placeholder="お名前" />
                            {errors.name && (<FormHelperText>{errors.name.message}</FormHelperText>)}
                            <TextField id="mail" {...register('mail', { required: "メールアドレスを入力してください。" })} placeholder="メールアドレス" />
                            {errors.mail && (<FormHelperText>{errors.mail.message}</FormHelperText>)}
                            <TextField id="tel" {...register('tel', { required: "電話番号を入力してください。" })} placeholder="電話番号" />
                            {errors.tel && (<FormHelperText>{errors.tel.message}</FormHelperText>)}
                            <TextField id="password" {...register('password', { required: "パスワードを入力してください。" })} type="password" placeholder="パスワード" />
                            {errors.password && (<FormHelperText>{errors.password.message}</FormHelperText>)}
                            <Button type="submit" variant="outlined" fullWidth>新規登録</Button>
                        </Stack>
                    </FormControl>
                </form>
            </Container>
        </>
    );
}