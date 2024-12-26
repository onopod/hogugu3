"use client"

import { getGenders, getPrefectures, getTherapistProfile, putTherapist } from "@/app/actions";
import { AppBar, BottomBar, Profile } from "@/app/components/t";
import { Container } from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function ProfilePage() {
    const [prefectures, setPrefectures] = useState([])
    const [genders, setGenders] = useState([])
    const [therapist, setTherapist] = useState({})
    const { handleSubmit, control, register, watch, reset, setValue } = useForm({
        defaultValues: {
            name: "",
            mail: "",
            tel: "",
            genderId: "",
            imageFileName: "",
            zipcode: "",
            prefectureId: "",
            cityId: "",
            workYear: "",
            comment: ""
        }
    });
    const onSubmit = data => {
        const saveTherapist = async (data) => {

            const formData = new FormData();
            formData.append("name", data.name);
            formData.append("mail", data.mail);
            formData.append("tel", data.tel);
            formData.append("genderId", data.genderId);
            formData.append("imageFileName", data.imageFileName[0]);
            formData.append("prefectureId", data.prefectureId)
            formData.append("zipcode", data.zipcode)
            formData.append("cityId", data.cityId)
            formData.append("workYear", data.workYear)
            formData.append("comment", data.comment)
            await putTherapist(formData)
        }
        saveTherapist(data)
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
                        //setValue("city", data.results[0].address2)
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
                const therapist = await getTherapistProfile()
                setTherapist(therapist);
                reset({
                    name: therapist.name || "",
                    mail: therapist.mail || "",
                    tel: therapist.tel || "",
                    genderId: therapist.genderId || "",
                    imageFileName: therapist.imageFileName || "",
                    zipcode: therapist.zipcode || "",
                    prefectureId: therapist.prefectureId || "",
                    cityId: therapist.cityId || "",
                    workYear: therapist.workYear || "",
                    comment: therapist.comment || ""
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
                    therapist={therapist}
                    handleSubmit={handleSubmit}
                    onSubmit={onSubmit}
                    register={register} />
            </Container>
            <BottomBar />
        </>
    )
}