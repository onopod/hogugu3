"use client"
import { Button, FormControl, TextField } from "@mui/material";
import AppBar from "../components/AppBar";
export default function Login() {
    return (
        <><AppBar />
            <h1>新規登録</h1>
            <FormControl>
                <TextField label="電話番号"></TextField>
                <TextField label="パスワード"></TextField>
                <Button href="/">登録</Button>
            </FormControl>
        </>
    )
        ;
}