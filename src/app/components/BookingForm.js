import { Button, FormControl, FormLabel, MenuItem, Select } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useForm } from "react-hook-form";

export default function BookingForm({ therapist }) {
    const router = useRouter();
    const { register, handleSubmit } = useForm()
    const onSubmit = data => {
        console.log(data);
        fetch('/api/reservations', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
                router.push("/reservation")
            })
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl fullWidth>
                予約
                <FormLabel>メニュー</FormLabel>

                <Select id="therapistMenuId" name="therapistMenuId" label="therapistMenuId" defaultValue={0} {...register("therapistMenuId")}>
                    <MenuItem value={0}>選択</MenuItem>
                    {therapist.menus?.map((menu, idx) => (
                        <MenuItem key={idx} value={menu.menu.id}>
                            {menu.menu.name}:{menu.treatmentTime}分 {menu.price}円
                        </MenuItem>
                    ))}
                </Select>
                <FormLabel>予約時間</FormLabel>
                <input type="datetime-local" {...register("startDt")} />
                <Button type="submit">予約</Button>
            </FormControl>
        </form>
    );
}
