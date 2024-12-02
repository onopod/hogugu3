import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export default function BasicPagination() {
    return (
        <Stack spacing={2}>
            <Pagination count={3} color="primary" size="large" />
        </Stack>
    );
}
