import { HotelIcon, MessageIcon, SettingsIcon } from '@/app/icons';
import { BottomNavigation, BottomNavigationAction, Box, Paper } from '@mui/material';
import { useRouter } from "next/navigation";
import { useRef, useState } from 'react';

export default function FixedBottomNavigation() {
    const router = useRouter();
    const [value, setValue] = useState(0);
    const ref = useRef(null);
    return (
        <Box maxWidth="sm" sx={{ display: "flex", pb: 7 }} ref={ref}>
            <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
                <BottomNavigation
                    showLabels
                    value={value}
                    onChange={(_, newValue) => setValue(newValue)}
                >
                    <BottomNavigationAction onClick={() => router.push("/message")} label="Message" icon={<MessageIcon />} />
                    <BottomNavigationAction onClick={() => router.push("/reservation")} label="Reservation" icon={<HotelIcon />} />
                    <BottomNavigationAction onClick={() => router.push("/setting")} label="Setting" icon={<SettingsIcon />} />
                </BottomNavigation>
            </Paper>
        </Box>
    );
}