"use client"

import { getUser, putUser } from "@/app/actions";
import { getGenders, getPrefectures } from "@/app/actions";
import { AppBar, BottomBar, Profile } from "@/app/components";
import { Container } from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function ProfilePage() {
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
        const saveUser = async (data) => {

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
            await putUser(formData)
        }
        saveUser(data)
            .then(() => { window.location.reload() })
    }
    const zipcode = watch("zipcode")
    const changeZipCode = () => {
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
            const fetchData = async function () {
                const user = await getUser()
                setUser(user);
                reset({
                    name: user.name || "",
                    mail: user.mail || "",
                    tel: user.tel || "",
                    genderId: user.genderId || "",
                    imageFileName: user.imageFileName || "",
                    zipcode: user.zipcode || "",
                    prefectureId: user.prefectureId || "",
                    city: user.city || "",
                    address: user.address || ""
                });
            }
            fetchData()
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