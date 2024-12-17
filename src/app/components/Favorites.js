import { Avatar, List, ListItemButton, ListItemText } from "@mui/material";
import { useRouter } from "next/navigation";

export default function Favorites({ favorites }) {
    const router = useRouter();
    return (
        <List>
            {favorites.map((favorite, idx) => (
                <ListItemButton key={idx} onClick={() => router.push(`/therapist/${favorite.therapist.id}`)}>
                    <Avatar alt={favorite.therapist.name}
                        src={favorite.therapist.imageFileName ? `/therapistImg/${favorite.therapist.id}/${favorite.therapist.imageFileName}` : ""}>
                        {favorite.therapist.name.toUpperCase()}
                    </Avatar>
                    <ListItemText sx={{ ml: 1 }}
                        primary={favorite.therapist.name} />
                </ListItemButton>
            ))}
        </List>
    )
}