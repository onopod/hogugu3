import { HotelIcon, MessageIcon, SettingsIcon } from '@/app/icons';
import { BottomNavigation, BottomNavigationAction, Box, Paper } from '@mui/material';
import { useRef, useState } from 'react';

export default function FixedBottomNavigation() {
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
                    <BottomNavigationAction href="/message" label="Message" icon={<MessageIcon />} />
                    <BottomNavigationAction href="/reservation" label="Reservation" icon={<HotelIcon />} />
                    <BottomNavigationAction href="/setting" label="Setting" icon={<SettingsIcon />} />
                </BottomNavigation>
            </Paper>
        </Box>
    );
}