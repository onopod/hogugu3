import CloseIcon from '@mui/icons-material/Close';
import { AppBar, Button, Dialog, DialogContent, IconButton, MenuItem, Select, Slide, Stack, TextField, Toolbar, Typography } from '@mui/material';
import { Fragment, forwardRef, useState } from 'react';

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog({ handleSubmit, onSubmit, setValue, watch }) {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    const [menu, setMenu] = useState("");
    const selectedPrefecture = watch("prefectureId");

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
                <form onSubmit={handleSubmit(onSubmit)}>
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
                            <Button type="submit" autoFocus color="inherit" onClick={handleClose}>
                                save
                            </Button>
                        </Toolbar>
                    </AppBar>
                    <DialogContent>
                        <Stack spacing={2}>
                            地域
                            <Select id="prefectureId"
                                value={selectedPrefecture} // 選択された値を設定

                                onChange={(e) => setValue("prefectureId", e.target.value)} // 選択値を更新
                                displayEmpty
                                label="prefecture">
                                <MenuItem value={27}>大阪</MenuItem>
                                <MenuItem value={28}>京都</MenuItem>
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
                </form>
            </Dialog>
        </Fragment >
    );
}