import { Button, FormControl, MenuItem, Select, Stack, TextField } from "@mui/material";
import Image from "next/image";
import { Controller } from "react-hook-form";

export default function Profile({ changeZipCode, prefectures, genders, therapist, control, handleSubmit,
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
                        施術年数：
                        <TextField id="workYear" {...register("workYear")} />
                    </FormControl>
                    <FormControl>
                        一言コメント：
                        <TextField id="comment" {...register("comment")} />
                    </FormControl>

                    <FormControl>
                        プロフィール画像
                        <input id="imageFileName" type="file" {...register("imageFileName")} />
                    </FormControl>

                    {therapist.imageFileName && (
                        <Image
                            alt={therapist.imageFileName}
                            src={`/therapistImg/${therapist.id}/${therapist.imageFileName}`}
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
                        <Button onClick={() => changeZipCode()}>郵便番号から都道府県／市区を入力</Button>
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
                        <TextField id="cityId" {...register("cityId")} />
                    </FormControl>
                    <Button type="submit">更新</Button>
                </Stack>
            </form>
        </Stack>
    );
}
