import { Button, FormControl, MenuItem, Select, Stack, TextField } from "@mui/material";
import Image from "next/image";
import { Controller } from "react-hook-form";

export default function Profile({ changeZipCode, prefectures, genders, user, control, handleSubmit,
    onSubmit, register }) {
    return (
        <Stack spacing={1}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Stack spacing={1}>
                    <FormControl>
                        名前：
                        <TextField id="name" {...register("name")} />
                    </FormControl>

                    <FormControl>
                        性別：
                        <Controller
                            name="genderId"
                            control={control}
                            render={({ field }) => (
                                <Select
                                    id="genderId"
                                    {...field}
                                    value={field.value}
                                    onChange={(e) => {
                                        field.onChange(e.target.value);
                                    }}
                                    label="genderId"
                                >
                                    {genders?.map((gender, idx) => (
                                        <MenuItem key={idx} value={gender.id}>
                                            {gender.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            )}
                        />
                    </FormControl>

                    <FormControl>
                        メールアドレス：
                        <TextField id="mail" {...register("mail")} />
                    </FormControl>

                    <FormControl>
                        電話番号：
                        <TextField id="tel" {...register("tel")} />
                    </FormControl>

                    <FormControl>
                        プロフィール画像
                        <input id="imageFileName" type="file" {...register("imageFileName")} />
                    </FormControl>

                    {user.imageFileName && (
                        <Image
                            alt={user.imageFileName}
                            src={`/userImg/${user.id}/${user.imageFileName}`}
                            width={300}
                            height={300}
                            priority
                        />
                    )}

                    <FormControl>
                        郵便番号
                        <TextField id="zipcode" {...register("zipcode")} />
                    </FormControl>
                    <FormControl>
                        <Button onClick={() => changeZipCode()}>郵便番号から住所を入力</Button>
                    </FormControl>

                    <FormControl>
                        <Controller
                            name="prefectureId"
                            control={control}
                            render={({ field }) => (
                                <Select
                                    id="prefectureId"
                                    {...field}
                                    value={field.value}
                                    onChange={(e) => {
                                        field.onChange(e.target.value);
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
                    </FormControl>

                    <FormControl>
                        市区
                        <TextField id="cityId" {...register("city")} />
                    </FormControl>

                    <FormControl>
                        以降の住所
                        <TextField id="address" {...register("address")} />
                    </FormControl>

                    <Button type="submit">更新</Button>
                </Stack>
            </form>
        </Stack>
    );
}
