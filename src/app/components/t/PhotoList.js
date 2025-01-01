import { getPhotos } from "@/app/actions"
import { ImageList, ImageListItem } from "@mui/material"
import Image from "next/image"

export default async function PhotoList() {
    const photos = await getPhotos();
    console.log("photos is")
    console.dir(photos)
    if (!(photos)) return
    return (
        <ImageList>
            {photos.map(p =>
                <ImageListItem key={p.id}>
                    <Image
                        alt={p.id}
                        src={`/therapistPhoto/${p.therapistId}/${p.filename}`}
                        width={150} // サムネイルの幅
                        height={100} // サムネイルの高さ
                        quality={50} // 画像品質（0〜100）
                        priority
                    />
                </ImageListItem>
            )}
        </ImageList>
    )
}