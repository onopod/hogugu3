import CloseIcon from '@mui/icons-material/Close';
import { AppBar, Button, Dialog, DialogContent, IconButton, MenuItem, Select, Slide, Stack, TextField, Toolbar, Typography } from '@mui/material';
import { Fragment, forwardRef, useState } from 'react';

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
            <Stack sx={{ mt: 1, mb: 1 }}>
                <Button variant="outlined" onClick={handleClickOpen}>
                    検索
                </Button>
            </Stack>
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
                            検索
                        </Typography>
                        <Button autoFocus color="inherit" onClick={handleClose}>
                            save
                        </Button>
                    </Toolbar>
                </AppBar>
                <DialogContent>
                    <Stack spacing={2}>
                        地域
                        <Select onChange={(e) => setArea(e.target.value)}
                            value={area}
                            label="area"
                            name="area">
                            <MenuItem value="東京">東京</MenuItem>
                            <MenuItem value="大阪">大阪</MenuItem>
                        </Select>
                        メニュー
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
        </Fragment >
    );
}