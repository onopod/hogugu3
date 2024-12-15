import { Button, FormControl, FormLabel, MenuItem, Select } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useForm } from "react-hook-form";

export default function BookingForm({ therapist }) {
    const router = useRouter();
    const { register, handleSubmit, reset, watch, setValue } = useForm({
        "defaultValues": {
            startDt: "",
            therapistMenuId: ""
        }
    })
    const selectedTherapistMenuId = watch("therapistMenuId");

    const onSubmit = data => {
        fetch('/api/reservations', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        })
            .then((res) => res.json())
            .then((data) => {
                router.push("/reservation")
            })
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl fullWidth>
                予約
                <FormLabel>メニュー</FormLabel>

                <Select id="therapistMenuId"
                    value={selectedTherapistMenuId}
                    onChange={(e) => setValue("therapistMenuId", e.target.value)}
                    label="therapistMenuId" >
                    {therapist.menus?.map((menu, idx) => (
                        <MenuItem key={idx} value={menu.menu.id}>
                            {menu.menu.name}:{menu.treatmentTime}分 {menu.price}円
                        </MenuItem>
                    ))}
                </Select>
                <FormLabel>予約時間</FormLabel>
                <input type="datetime-local" {...register("startDt")} />
                <Button type="submit">予約</Button>
                <Button onClick={() => reset()}>リセット</Button>
            </FormControl>
        </form>
    );
}