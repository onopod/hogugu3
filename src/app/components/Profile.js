import { Select, MenuItem, Button, FormControl, Stack, TextField } from "@mui/material";
import { Controller } from "react-hook-form";
import Image from "next/image";

export default function Profile({ prefectures, user, control, handleSubmit, onSubmit, register }) {
    return (
        <Stack spacing={1}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl>
                    <Stack spacing={1}>
                        名前：<TextField id="name" {...register("name")} />
                        メールアドレス：<TextField id="mail" {...register("mail")} />
                        電話番号：<TextField id="tel" {...register("tel")} />
                        プロフィール画像 <input id="imageFileName"
                            type="file"
                            {...register("imageFileName")}

                        />
                        {user.imageFileName ? (
                            <Image
                                alt={user.imageFileName}
                                src={`/userImg/${user.id}/${user.imageFileName}`}
                                width={300}
                                height={300}
                                priority
                            />
                        ) : ""}
                        郵便番号<TextField id="zipcode" {...register("zipcode")} />
                        <Controller
                            name="prefectureId"
                            control={control}
                            render={({ field }) => (
                                <Select
                                    id="therapistMenuId"
                                    {...field}
                                    value={field.value}
                                    onChange={(e) => {
                                        field.onChange(e.target.value);
                                        setValue("prefectureId", e.target.value);
                                    }}
                                    label="prefectureId"
                                >
                                    {prefectures?.map((prefecture, idx) => (
                                        <MenuItem key={idx} value={prefecture.id}>
                                            {prefecture.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            )}
                        />
                        市区<TextField id="city" {...register("city")} />
                        以降の住所<TextField id="address" {...register("address")} />
                        <Button type="submit">更新</Button>
                    </Stack>
                </FormControl>
            </form>
        </Stack>
    );
}