import { MenuItem, Select } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import * as React from 'react';

export default function FormDialog() {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <React.Fragment>
            <Button variant="outlined" onClick={handleClickOpen}>
                検索
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                PaperProps={{
                    component: 'form',
                    onSubmit: (event) => {
                        event.preventDefault();
                        const formData = new FormData(event.currentTarget);
                        const formJson = Object.fromEntries(formData.entries());
                        const email = formJson.email;
                        console.log(email);
                        handleClose();
                    },
                }}
            >
                <DialogTitle>検索</DialogTitle>
                <DialogContent>

                    <Select name="area">
                        <MenuItem value="東京">東京</MenuItem>
                        <MenuItem value="大阪">大阪</MenuItem>
                    </Select>
                    <Select>
                        <MenuItem value="もみほぐし">もみほぐし</MenuItem>
                        <MenuItem value="オイル">オイル</MenuItem>
                    </Select>
                    <TextField label="フリーワード" />

                </DialogContent>
                <DialogActions>
                    <Button type="submit">検索</Button>
                    <Button onClick={handleClose}>キャンセル</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
