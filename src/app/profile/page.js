"use client"

import { AppBar, BottomBar, Profile } from "@/app/components";
import { Container } from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function ProfilePage() {
    const [user, setUser] = useState({})
    const { handleSubmit, register, reset } = useForm({
        defaultValues: {
            name: user.name,
            mail: user.mail,
            imageFileName: user.imageFileName
        }
    });
    const onSubmit = data => {
        console.log(data.imageFileName[0])
        // FormDataを作成
        const formData = new FormData();
        formData.append("name", data.name); // テキストフィールドを追加
        formData.append("mail", data.mail);
        formData.append("imageFileName", data.imageFileName[0]); // ファイルを追加

        fetch('/api/users/me', {
            method: "PUT",
            body: formData
        })
    }
    useEffect(() => {
        fetch("/api/users/me")
            .then(res => res.json())
            .then(data => {
                setUser(data.user);
                reset({ name: data.user.name, mail: data.user.mail, imageFileName: data.user.imageFileName });
            })
        // eslint-disable-next-line
    }, [])
    return (
        <>
            <AppBar />
            <Container maxWidth="sm">
                <Profile user={user} handleSubmit={handleSubmit} onSubmit={onSubmit} register={register} />
            </Container>
            <BottomBar />
        </>
    )
}