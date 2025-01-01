
import { getPhotos } from "@/app/actions"
import Image from "next/image"
import { ImageList, ImageListItem, ImageListItemBar } from "@mui/material";
import DeletePhotoButton from "@/app/components/t/DeletePhotoButton"

export default async function PhotoList() {
    const photos = await getPhotos();
    if (!(photos)) return

    return (
        <ImageList>
            {photos.map(p =>
                <ImageListItem key={p.id}>
                    <img
                        alt={p.id}
                        src={`/therapistPhoto/${p.therapistId}/${p.filename}`}
                        quality={50} // 画像品質（0〜100）
                    />
                    <ImageListItemBar
                        title="test"
                        actionIcon={
                            <DeletePhotoButton photoId={p.id} />
                        }
                    />

                </ImageListItem>
            )}
        </ImageList>
    )
}