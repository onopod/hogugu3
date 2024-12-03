import { Badge, Avatar, List, ListItemAvatar, ListItemButton, ListItemText } from "@mui/material";
export default function MessageUserList() {
    const messageUsers = [
        { name: "sato", message: "ご予約いただきまして、ありがとうございます。" },
        { name: "lisa", message: "承知しました。" }
    ];
    return (
        <List>
            {messageUsers.map((messageUser, idx) => (

                <ListItemButton key={idx} href="/messagedetail">
                    <Badge anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                        overlap="circular" badgeContent=" " variant="dot"
                        color="primary">
                        <ListItemAvatar>
                            <Avatar alt="Profile Picture" src="/avatar.jpg" />
                        </ListItemAvatar>
                    </Badge>
                    <ListItemText primary={messageUser.name} secondary={messageUser.message} />
                </ListItemButton>
            ))}
        </List>
    )
}