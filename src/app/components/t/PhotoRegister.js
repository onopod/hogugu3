"use client"
import { postPhoto } from "@/app/actions"
import { useRouter } from "next/navigation"

export default function PhotoRegister() {
    const router = useRouter()
    const registPhoto = async ({ files }) => {
        await postPhoto({ files })
    }
    const onRegistChange = (e) => {
        registPhoto({
            files: e.target.files
        })
        router.refresh()
    }
    return (
        <input id="photoFile"
            multiple
            type="file"
            onChange={(e) => onRegistChange(e)} />
    )
}