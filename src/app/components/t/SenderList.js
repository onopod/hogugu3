import { Avatar, Badge, List, ListItemButton, ListItemText } from "@mui/material";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
export default function SenderList({ senders }) {
    const router = useRouter();
    return (
        <List>
            {senders ? senders.map((sender, idx) => (

                <ListItemButton key={idx} onClick={() => router.push(`/t/message/sender/${sender.id}`)}>
                    {sender.messages[0].isRead ? (
                        <Avatar alt={sender.name} src={sender.imageFileName ? `/userImg/${sender.id}/${sender.imageFileName}` : ""}>
                            {sender.name[0].toUpperCase()}
                        </Avatar>
                    ) : (
                        <Badge anchorOrigin={{ vertical: 'top', horizontal: 'right', }}
                            overlap="circular" badgeContent=" " variant="dot"
                            color="primary">
                            <Avatar alt={sender.name} src={sender.imageFileName ? `/userImg/${sender.id}/${sender.imageFileName}` : ""}>
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