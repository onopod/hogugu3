import { Button, FormControl, Stack, TextField } from "@mui/material";
import Image from "next/image";

export default function Profile({ user, handleSubmit, onSubmit, register }) {
    return (
        <Stack spacing={1}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl>
                    <Stack spacing={1}>
                        名前：<TextField id="name" {...register("name")} />
                        メールアドレス：<TextField id="mail" {...register("mail")} />
                        プロフィール画像 <input id="imageFileName" type="file" {...register("imageFileName")} />
                        {user.imageFileName ? (
                            <Image
                                alt={user.imageFileName}
                                src={`/userImg/${user.id}/${user.imageFileName}`}
                                width={300}
                                height={300}
                                priority
                            />
                        ) : ""}
                        <Button type="submit">更新</Button>
                    </Stack>
                </FormControl>
            </form>
        </Stack>
    );
}