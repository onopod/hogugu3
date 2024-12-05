"use client"
import PropTypes from 'prop-types';
import * as React from 'react';

import { Avatar, Box, Container, Stack, Tab, Tabs, Typography } from '@mui/material';
import AppBar from '../components/AppBar';
import BottomBar from "../components/BottomBar";

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
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
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function ReservationPage() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <>
            <AppBar />
            <Container maxWidth="sm">
                <Box sx={{ width: '100%' }}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs variant="fullWidth"
                            value={value}
                            onChange={handleChange}
                            aria-label="basic tabs example">
                            <Tab label="現在の予約" {...a11yProps(0)} />
                            <Tab label="過去の予約" {...a11yProps(1)} />
                        </Tabs>
                    </Box>
                    <CustomTabPanel value={value} index={0}>
                        <Stack spacing={2} sx={{ mt: 1 }}>
                            <Stack direction="row" spacing={2}>
                                <Box>
                                    <Avatar alt="Tanaka Mitsuru" src="/avatar.jpg" />
                                </Box>
                                <Box>
                                    <Typography>Tanaka Risa</Typography>
                                    <Typography>2024/12/24 14:00から90分 オイルマッサージ</Typography>
                                </Box>
                            </Stack>
                            <Stack direction="row" spacing={2}>
                                <Box>
                                    <Avatar alt="Tanaka Mitsuru" src="/avatar.jpg" />
                                </Box>
                                <Box>
                                    <Typography>Tanaka Risa</Typography>
                                    <Typography>2024/12/24 14:00から90分 オイルマッサージ</Typography>
                                </Box>
                            </Stack>
                        </Stack>
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={1}>
                        <Stack spacing={2} sx={{ mt: 1 }}>
                            <Stack direction="row" spacing={2}>
                                <Box>
                                    <Avatar alt="Tanaka Mitsuru" src="/avatar.jpg" />
                                </Box>
                                <Box>
                                    <Typography>Tanaka Risa</Typography>
                                    <Typography>2024/12/24 14:00から90分 オイルマッサージ</Typography>
                                </Box>
                            </Stack>
                        </Stack>
                    </CustomTabPanel>
                </Box>
            </Container>
            <BottomBar />
        </>
    );
}
