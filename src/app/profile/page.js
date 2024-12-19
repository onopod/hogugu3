"use client"

import { getGenders, getPrefectures } from "@/app/actions";
import { AppBar, BottomBar, Profile } from "@/app/components";
import { Container } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function ProfilePage() {
    const router = useRouter();
    const [prefectures, setPrefectures] = useState([])
    const [genders, setGenders] = useState([])
    const [user, setUser] = useState({})
    const { handleSubmit, control, register, watch, reset, setValue } = useForm({
        defaultValues: {
            name: "",
            mail: "",
            tel: "",
            genderId: "",
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
        formData.append("genderId", data.genderId);
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
    const zipcode = watch("zipcode")
    const changeZipCode = () => {
        console.log("zipcode is", zipcode)
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
    }
    useEffect(() => {
        const fetchData = async () => {
            setGenders(await getGenders())
            setPrefectures(await getPrefectures())
        }
        fetchData().then(() => {
            fetch("/api/users/me")
                .then(res => res.json())
                .then(data => {
                    setUser(data.user);
                    reset({
                        name: data.user.name || "",
                        mail: data.user.mail || "",
                        tel: data.user.tel || "",
                        genderId: data.user.genderId || "",
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
                <Profile changeZipCode={changeZipCode}
                    prefectures={prefectures}
                    genders={genders}
                    control={control}
                    user={user}
                    handleSubmit={handleSubmit}
                    onSubmit={onSubmit}
                    register={register} />
            </Container>
            <BottomBar />
        </>
    )
}