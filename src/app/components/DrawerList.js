import { Box, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { useRouter } from 'next/navigation';

function DrawerList({ pages, toggleDrawer }) {
    const router = useRouter();

    return (
        <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
            <List>
                {pages.map((page) => (
                    <ListItem key={page.path} disablePadding>
                        <ListItemButton onClick={() => router.push(page.path)}>
                            <ListItemText primary={page.name} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );
}

export default DrawerList;
