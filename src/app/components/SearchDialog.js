import { CloseIcon } from '@/app/icons';
import { AppBar, Button, Dialog, DialogContent, IconButton, MenuItem, Select, Slide, Stack, TextField, Toolbar, Typography } from '@mui/material';
import { Fragment, forwardRef, useState } from 'react';

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog({ prefectures, menus, handleSubmit, onSubmit, register, setValue, watch, reset }) {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const selectedPrefecture = watch("prefectureId");
    const selectedMenuId = watch("menuId");

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
                        </Toolbar>
                    </AppBar>
                    <DialogContent>
                        <Stack spacing={2}>
                            地域
                            <Select id="prefectureId"
                                value={selectedPrefecture}
                                onChange={(e) => setValue("prefectureId", e.target.value)}
                                displayEmpty
                                label="prefecture">
                                {prefectures.map(prefecture => <MenuItem key={prefecture.id} value={prefecture.id}>{prefecture.name}</MenuItem>)}
                            </Select>
                            メニュー
                            <Select id="menuId"
                                value={selectedMenuId}
                                onChange={(e) => setValue("menuId", e.target.value)}
                                displayEmpty
                                label="menu">
                                {menus.map(menu => <MenuItem key={menu.id} value={menu.id}>{menu.name}</MenuItem>)}
                            </Select>
                            <TextField id="freeWord" {...register("freeWord")} label="フリーワード" />
                        </Stack>
                        <Button type="submit" onClick={handleClose}>送信</Button>
                        <Button onClick={() => reset()}>リセット</Button>
                    </DialogContent>
                </form>
            </Dialog>
        </Fragment >
    );
}