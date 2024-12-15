import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Link, Slide } from '@mui/material';
import { forwardRef, Fragment, useState } from 'react';

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide() {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Fragment>
            <Button variant="outlined" onClick={handleClickOpen}>
                予約内容を確認
            </Button>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>下記の内容で予約を行います</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        もみほぐし60分 12000円
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Link href="/dashboard">予約</Link>
                    <Button onClick={handleClose}>戻る</Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    );
}
