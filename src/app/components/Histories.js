import { Avatar, List, ListItemButton, ListItemText } from "@mui/material";
import { useRouter } from "next/navigation";

export default function Histories({ histories }) {
    const router = useRouter();
    return (
        <List>
            {histories.map((history, idx) => (
                <ListItemButton key={idx} onClick={() => router.push(`/therapist/${history.therapist.id}`)}>
                    <Avatar alt={history.therapist.name}
                        src={history.therapist.imageFileName ? `/therapistImg/${history.therapist.id}/${history.therapist.imageFileName}` : ""}>
                        {history.therapist.name.toUpperCase()}
                    </Avatar>
                    <ListItemText sx={{ ml: 1 }}
                        primary={history.therapist.name} />
                </ListItemButton>
            ))}
        </List>
    )
}