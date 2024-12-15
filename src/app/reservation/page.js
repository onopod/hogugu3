"use client"
import { AppBar, BottomBar } from '@/app/components';
import { Avatar, Box, Container, Stack, Tab, Tabs, Typography } from '@mui/material';
import { format } from "date-fns";
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`statusId-${index}`}
            aria-labelledby={`statusId-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `statusId-${index}`,
        'aria-controls': `statusId-${index}`,
    };
}

export default function ReservationPage() {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const [statuses, setStatuses] = useState([])
    const [reservations, setReservations] = useState([])

    useEffect(() => {
        fetch("/api/statuses")
            .then(req => req.json())
            .then(data => {
                setStatuses(data.statuses)
            })
    }, [])
    useEffect(() => {
        fetch("/api/reservations")
            .then(req => req.json())
            .then(data => {
                setReservations(data.reservations)
            })
    }, [])

    return (
        <>
            <AppBar />
            <Container maxWidth="sm">
                <Box sx={{ width: '100%' }}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs variant="fullWidth"
                            value={value}
                            onChange={handleChange}
                            aria-label="statusId">
                            {statuses.map(status => <Tab key={status.id} label={status.name} {...a11yProps(status.id - 1)} />)}
                        </Tabs>
                    </Box>
                    {statuses.map(status => (
                        <CustomTabPanel key={status.id} value={value} index={status.id - 1}>
                            <Stack spacing={2} sx={{ mt: 1 }}>
                                {reservations ? reservations.filter(reservation => reservation.statusId == status.id).map((reservation) => (
                                    <Stack key={reservation.id} direction="row" spacing={2} key={reservation.id}>
                                        <Box>
                                            <Avatar alt={reservation.therapistMenu.therapist.name} src="/avatar.jpg" />
                                        </Box>
                                        <Box>
                                            <Typography>{reservation.therapistMenu.therapist.name}</Typography>
                                            <Typography>{format(reservation.startDt, "yyyy/MM/dd kk:mm")}から{reservation.therapistMenu.treatmentTime}分 {reservation.therapistMenu.menu.name}</Typography>
                                        </Box>
                                    </Stack>
                                )) : ""}
                            </Stack>
                        </CustomTabPanel>
                    ))}
                </Box>
            </Container>
            <BottomBar />
        </>
    );
}