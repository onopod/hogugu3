import { SearchIcon } from "@/app/icons";
import { Box, Fab } from "@mui/material";

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
