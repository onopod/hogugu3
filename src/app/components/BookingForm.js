import { MenuItem, Select } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { renderTimeViewClock } from '@mui/x-date-pickers/timeViewRenderers';
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
