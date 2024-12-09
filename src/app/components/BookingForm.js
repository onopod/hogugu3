import { FormControl, FormControlLabel, FormLabel, MenuItem, Radio, RadioGroup, Select, Typography } from '@mui/material';
import { AdapterDayjs, DateTimePicker, LocalizationProvider, renderTimeViewClock } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import 'dayjs/locale/ja';
import BookingConfirmDialog from "./BookingConfirmDialog";

dayjs.locale('ja');

export default function BookingForm({ therapist }) {
    return (
        <FormControl>
            予約
            <FormLabel>メニュー</FormLabel>
            <RadioGroup defaultValue="female" name="menu">
                {therapist.menus?.map((menu, idx) => (
                    <>
                        <Typography key={idx}>{menu.menu.name}:{menu.treatmentTime}min {menu.price}円</Typography>
                        <FormControlLabel value="menu.menu.id" control={<Radio />} label={`${menu.menu.name}:${menu.treatmentTime}min ${menu.price}円`} />
                    </>
                ))}
            </RadioGroup>
            <FormLabel>予約時間</FormLabel>
            <LocalizationProvider dateAdapter={AdapterDayjs} dateFormats={{ year: 'YYYY年' }}>
                <DateTimePicker label="予約日時"
                    format="YYYY/MM/DD hh:mm"
                    slotProps={{ calendarHeader: { format: 'YYYY年MM月' } }}
                    views={['year', 'month', 'day', 'hours', 'minutes']}
                    viewRenderers={{
                        hours: renderTimeViewClock,
                        minutes: renderTimeViewClock
                    }} />
            </LocalizationProvider>
            から
            <Select label="tm">
                <MenuItem value={60}>60分</MenuItem>
                <MenuItem value={90}>90分</MenuItem>
                <MenuItem value={120}>120分</MenuItem>
            </Select>
            金額：12000円
            <BookingConfirmDialog>予約</BookingConfirmDialog>
        </FormControl>
    );
}
