import SearchIcon from '@mui/icons-material/Search';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';

export default function FloatingActionButtons() {
    return (
        <Box sx={{ '& > :not(style)': { m: 1 } }}>
            <Fab variant="extended">
                <SearchIcon sx={{ mr: 1 }} />
                Search
            </Fab>
        </Box>
    );
}
