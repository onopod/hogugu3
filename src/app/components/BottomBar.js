import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import SettingsIcon from '@mui/icons-material/Settings';
import MessageIcon from '@mui/icons-material/Message';
import HotelIcon from '@mui/icons-material/Hotel';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';

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
        <Box sx={{ pb: 7 }} ref={ref}>
            <CssBaseline />

            <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
                <BottomNavigation
                    showLabels
                    value={value}
                    onChange={(event, newValue) => {
                        setValue(newValue);
                    }}
                >
                    <BottomNavigationAction href="#" label="Message" icon={<MessageIcon />} />
                    <BottomNavigationAction href="#" label="Reservation" icon={<HotelIcon />} />
                    <BottomNavigationAction href="#" label="Setting" icon={<SettingsIcon />} />
                </BottomNavigation>
            </Paper>
        </Box>
    );
}

