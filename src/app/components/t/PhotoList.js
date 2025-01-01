
import { getPhotos } from "@/app/actions"
import Image from "next/image"
import { ImageList, ImageListItem, ImageListItemBar } from "@mui/material";
import DeletePhotoButton from "@/app/components/t/DeletePhotoButton"

export default async function PhotoList() {
    const photos = await getPhotos();
    if (!(photos)) return
    return (
        <ImageList cols={2} gap={16} sx={{ width: "100%", maxWidth: 600, margin: "0 auto" }}>
            {photos.map(p =>
                <ImageListItem key={p.id}>
                    <Image
                        alt={p.id}
                        src={`/therapistPhoto/${p.therapistId}/${p.filename}`}
                        quality={50} // 画像品質（0〜100）
                        width={300} // デフォルト幅（レスポンシブ調整のため可変）
                        height={200} // デフォルト高さ（アスペクト比を調整する場合は調整）
                        style={{
                            width: "100%", // 親コンテナに応じて幅を調整
                            height: "auto", // アスペクト比を保持
                        }}
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