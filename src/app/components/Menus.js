import { List, ListItem, ListItemText } from "@mui/material";

export default function Menus({ therapist }) {
    return (
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            {therapist?.menus && therapist.menus.length > 0 && therapist.menus.map(menu =>
                <ListItem key={menu.id}>
                    <ListItemText primary={menu.menu.name}
                        secondary={`${menu.treatmentTime}分 ${menu.price}円`} />
                </ListItem>
            )}
        </List>
    )
}