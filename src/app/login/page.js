"use client"
import { AppBar } from "@/app/components";
import { FormHelperText, Button, Container, FormControl, Stack, TextField } from "@mui/material";
import { useRouter } from 'next/navigation';
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
export default function Login() {
    const router = useRouter();

    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = async data => {
        try {
            await signIn("user", {
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
                            <TextField id="mail" {...register('mail', { required: "メールアドレスを入力してください。" })} placeholder="メールアドレス" />
                            {errors.mail && (<FormHelperText>{errors.mail.message}</FormHelperText>)}
                            <TextField id="password" {...register('password', { required: "パスワードを入力してください。" })} type="password" placeholder="パスワード" />
                            {errors.password && (<FormHelperText>{errors.password.message}</FormHelperText>)}
                            <Button type="submit" variant="outlined" fullWidth>ログイン</Button>
                        </Stack>
                    </FormControl>
                </form>
            </Container>
        </>
    )
        ;
}