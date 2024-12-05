import HotelIcon from '@mui/icons-material/Hotel';
import MessageIcon from '@mui/icons-material/Message';
import SettingsIcon from '@mui/icons-material/Settings';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import * as React from 'react';
function refreshMessages() {
    const getRandomInt = (max) => Math.floor(Math.random() * Math.floor(max));

    return Array.from(new Array(50)).map(
        () => messageExamples[getRandomInt(messageExamples.length)],
    );
}

export default function FixedBottomNavigation() {
    const [value, setValue] = React.useState(0);
    const ref = React.useRef(null);


    return (
        <Box maxWidth="sm" sx={{ display: "flex", pb: 7 }} ref={ref}>
            <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
                <BottomNavigation
                    showLabels
                    value={value}
                    onChange={(event, newValue) => {
                        setValue(newValue);
                    }}
                >
                    <BottomNavigationAction href="/message" label="Message" icon={<MessageIcon />} />
                    <BottomNavigationAction href="/reservation" label="Reservation" icon={<HotelIcon />} />
                    <BottomNavigationAction href="/setting" label="Setting" icon={<SettingsIcon />} />
                </BottomNavigation>
            </Paper>
        </Box>
    );
}

