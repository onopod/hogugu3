"use client"
import { Button, FormControl, TextField } from "@mui/material";
import AppBar from "../components/AppBar";
export default function Login() {
    return (
        <>
            <AppBar />
            <FormControl>
                <TextField label="電話番号"></TextField>
                <TextField label="パスワード"></TextField>
                <Button href="/dashboard">ログイン</Button>
            </FormControl>
        </>
    )
        ;
}