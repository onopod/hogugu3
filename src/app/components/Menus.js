import { List, ListItem, ListItemText } from "@mui/material";

export default function Menus({ therapistMenus }) {
    return (
        <List sx={{ width: '100%' }}>
            {therapistMenus.length > 0 && therapistMenus.map(menu =>
                <ListItem key={menu.id}>
                    <ListItemText primary={menu.name}
                        secondary={menu.therapistMenus.map(m => `${m.treatmentTime}分 ${m.price}円`).join(" / ")} />
                </ListItem>
            )}
        </List>
    )
}