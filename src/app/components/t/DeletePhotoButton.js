"use client"
import { deletePhoto } from "@/app/actions"
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useRouter } from "next/navigation";

export default function DeletePhotoButton({ photoId }) {

    const router = useRouter()
    const onDelete = async (photoId) => {
        await deletePhoto(photoId)
    }

    const handleDelete = (photoId) => {
        onDelete(photoId);
        router.refresh();
    }

    return (
        <IconButton onClick={() => handleDelete(photoId)}>
            <DeleteIcon />
        </IconButton>
    )
}