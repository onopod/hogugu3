import { Fragment, forwardRef, useState } from 'react';
import { Dialog, DialogContent, DialogTitle, Button, MenuItem, Select, TextField, Stack, AppBar, Toolbar, IconButton, Typography, Slide } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog() {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    const [area, setArea] = useState("");
    const [menu, setMenu] = useState("");

    return (
        <Fragment>
            <Button variant="outlined" onClick={handleClickOpen}>
                検索
            </Button>
            <Dialog
                fullScreen
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
            >
                <AppBar sx={{ position: 'relative' }}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleClose}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                            Sound
                        </Typography>
                        <Button autoFocus color="inherit" onClick={handleClose}>
                            save
                        </Button>
                    </Toolbar>
                </AppBar>
                <DialogContent>
                    <DialogTitle>検索</DialogTitle>
                    <Stack spacing={2}>
                        <Select onChange={(e) => setArea(e.target.value)}
                            value={area}
                            label="area"
                            name="area">
                            <MenuItem value="東京">東京</MenuItem>
                            <MenuItem value="大阪">大阪</MenuItem>
                        </Select>
                        <Select onChange={(e) => setMenu(e.target.value)}
                            value={menu}
                            label="menu"
                            name="menu">
                            <MenuItem value="もみほぐし">もみほぐし</MenuItem>
                            <MenuItem value="オイル">オイル</MenuItem>
                        </Select>
                        <TextField label="フリーワード" />
                    </Stack>

                </DialogContent>
            </Dialog>
        </Fragment>
    );
}