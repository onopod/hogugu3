"use client"

import { AppBar, BottomBar, Profile } from "@/app/components";
import { Container } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function ProfilePage() {
    const router = useRouter();
    const [prefectures, setPrefectures] = useState([])
    const [user, setUser] = useState({})
    const { handleSubmit, control, register, watch, reset, setValue } = useForm({
        defaultValues: {
            name: "",
            mail: "",
            tel: "",
            imageFileName: "",
            zipcode: "",
            prefectureId: "",
            city: "",
            address: ""
        }
    });
    const onSubmit = data => {
        // FormDataを作成
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("mail", data.mail);
        formData.append("tel", data.tel);
        formData.append("imageFileName", data.imageFileName[0]);
        formData.append("prefectureId", data.prefectureId)
        formData.append("zipcode", data.zipcode)
        formData.append("city", data.city)
        formData.append("address", data.address)

        fetch('/api/users/me', {
            method: "PUT",
            body: formData
        }).then(() => {
            window.location.reload()
        })
    }
    let zipcode = watch("zipcode");
    useEffect(() => {
        if (zipcode && zipcode.length == 7) {
            fetch("https://zipcloud.ibsnet.co.jp/api/search?" + new URLSearchParams({
                zipcode: zipcode
            }))
                .then(res => res.json())
                .then((data) => {
                    if (data.results.length == 1) {
                        setValue("prefectureId", parseInt(data.results[0].prefcode))
                        setValue("city", data.results[0].address2)
                        setValue("address", data.results[0].address3)
                    }
                })
        }
        // eslint-disable-next-line
    }, [zipcode])
    useEffect(() => {
        fetch("/api/prefectures")
            .then(res => res.json())
            .then(data => {
                setPrefectures(data.prefectures)

                fetch("/api/users/me")
                    .then(res => res.json())
                    .then(data => {
                        setUser(data.user);
                        reset({
                            name: data.user.name || "",
                            mail: data.user.mail || "",
                            tel: data.user.tel || "",
                            imageFileName: data.user.imageFileName || "",
                            zipcode: data.user.zipcode || "",
                            prefectureId: data.user.prefectureId || "",
                            city: data.user.city || "",
                            address: data.user.address || ""
                        });
                    })
            })
        // eslint-disable-next-line
    }, [])
    return (
        <>
            <AppBar />
            <Container maxWidth="sm">
                <Profile prefectures={prefectures} control={control} user={user} handleSubmit={handleSubmit} onSubmit={onSubmit} register={register} />
            </Container>
            <BottomBar />
        </>
    )
}