import { Badge, Avatar, List, ListItemAvatar, ListItemButton, ListItemText } from "@mui/material";
import { format } from "date-fns";
export default function SenderList({ senders }) {
    return (
        <List>
            {senders ? senders.map((sender, idx) => (

                <ListItemButton key={idx} href={`/messagedetail/${sender.id}`}>
                    {sender.messages[0].isRead ? (
                        <Avatar alt={sender.name} src={sender.imageFileName ? `/therapistImg/${sender.id}/${sender.imageFileName}` : ""}>
                            {sender.name[0].toUpperCase()}
                        </Avatar>
                    ) : (
                        <Badge anchorOrigin={{ vertical: 'top', horizontal: 'right', }}
                            overlap="circular" badgeContent=" " variant="dot"
                            color="primary">
                            <Avatar alt={sender.name} src={sender.imageFileName ? `/therapistImg/${sender.id}/${sender.imageFileName}` : ""}>
                                {sender.name[0].toUpperCase()}
                            </Avatar>
                        </Badge>
                    )}
                    <ListItemText sx={{ ml: 1 }} primary={sender.name} secondary={`${format(sender.messages[0].created, "yyyy/MM/dd kk:mm")} ${sender.messages[0].message}`} />
                </ListItemButton>
            )) : ""}
        </List>
    )
}