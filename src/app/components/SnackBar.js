import Alert from "@mui/material/Alert";
import Box from '@mui/material/Box';
import Snackbar from '@mui/material/Snackbar';
import * as React from 'react';

export default function PositionedSnackbar() {
    const [state, setState] = React.useState({
        open: true,
        vertical: 'top',
        horizontal: 'center',
    });
    const { vertical, horizontal, open } = state;


    const handleClose = () => {
        setState({ ...state, open: false });
    };

    return (
        <Box sx={{ width: 500 }}>
            <Snackbar
                anchorOrigin={{ vertical, horizontal }}
                open={open}
                onClose={handleClose}
                message="I love snacks"
                key={vertical + horizontal}
            >
                <Alert
                    onClose={handleClose}
                    severity="success"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    予約完了
                </Alert>
            </Snackbar>
        </Box>
    );
}
