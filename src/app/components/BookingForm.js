import { Button, FormControl, FormHelperText, FormLabel, MenuItem, Select } from '@mui/material';
import { format } from "date-fns";
import { useRouter } from 'next/navigation';
import { Controller, useForm } from "react-hook-form";
export default function BookingForm({ therapist }) {
    const router = useRouter();
    const { control, handleSubmit, reset, setValue, register, formState: { errors } } = useForm({
        defaultValues: {
            startDt: "",
            therapistMenuId: ""
        }
    });

    const onSubmit = data => {
        // 予約を登録
        fetch('/api/reservations', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        })
            .then(() => {
                // メッセージを送信
                fetch(`/api/messages/senders/${therapist.id}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        message: `セラピストへ予約リクエストを送信しました。
予約日時：${format(data.startDt, "yyyy/MM/dd kk:mm")}
メニュー：${therapist.menus.filter(menu => menu.id == data.therapistMenuId)[0].menu.name}
                        `,
                        messageStatusId: 3
                    })
                })
                    .then(() => router.push("/reservation"))
            });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl fullWidth error={!!errors.therapistMenuId}>
                <FormLabel>メニュー</FormLabel>
                <Controller
                    name="therapistMenuId"
                    control={control}
                    rules={{ required: "メニューを選択してください。" }}
                    render={({ field }) => (
                        <Select
                            id="therapistMenuId"
                            {...field}
                            value={field.value}
                            onChange={(e) => {
                                field.onChange(e.target.value);
                                setValue("therapistMenuId", e.target.value);
                            }}
                            label="therapistMenuId"
                        >
                            {therapist.menus?.map((menu, idx) => (
                                <MenuItem key={idx} value={menu.menu.id}>
                                    {menu.menu.name}:{menu.treatmentTime}分 {menu.price}円
                                </MenuItem>
                            ))}
                        </Select>
                    )}
                />
                {errors.therapistMenuId && (
                    <FormHelperText>{errors.therapistMenuId.message}</FormHelperText>
                )}
            </FormControl>

            <FormControl fullWidth error={!!errors.startDt}>
                <FormLabel>予約時間</FormLabel>
                <input
                    type="datetime-local"
                    {...register("startDt", { required: "予約時間を入力してください。" })}
                />
                {errors.startDt && (
                    <FormHelperText>{errors.startDt.message}</FormHelperText>
                )}
            </FormControl>

            <Button type="submit">予約リクエスト</Button>
            <Button onClick={() => reset()}>リセット</Button>
        </form>
    );
}
