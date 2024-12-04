import { IconButton, Stack } from '@mui/joy';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import Textarea from '@mui/joy/Textarea';
import { Avatar, Typography } from "@mui/material";

import FormatBoldRoundedIcon from '@mui/icons-material/FormatBoldRounded';
import FormatItalicRoundedIcon from '@mui/icons-material/FormatItalicRounded';
import FormatListBulletedRoundedIcon from '@mui/icons-material/FormatListBulletedRounded';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import StrikethroughSRoundedIcon from '@mui/icons-material/StrikethroughSRounded';

export default function MessageDetailList() {
    return (
        <>
            <Box className="message-area">
                <Stack spacing={1}>
                    <Box>
                        <Stack spacing={1} direction="row">
                            <Avatar src="/avatar.jpg" />
                            <Stack>
                                <Typography>ご予約sdafasdfありがとうございます</Typography>
                                <Typography>ご予約sdafasdfありがとうございます</Typography>
                                <Typography>ご予約sdafasdfありがとうございます</Typography>
                            </Stack>
                        </Stack>
                    </Box>
                    <Box>
                        <Stack spacing={1} direction="row-reverse">
                            <Avatar src="/avatar.jpg" />
                            <Stack>
                                <Typography>よろしくお願いします。</Typography>
                                <Typography>fasfsdfsdfsよろしくお願いします。</Typography>
                            </Stack>
                        </Stack>
                    </Box>
                </Stack>
            </Box>
            <Box className="message-input-area">
                <Box sx={{ px: 2, pb: 3 }}>
                    <FormControl>
                        <Textarea
                            placeholder="Type something here…"
                            aria-label="Message"
                            minRows={3}
                            maxRows={10}
                            endDecorator={
                                <Stack
                                    direction="row"
                                    sx={{
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        flexGrow: 1,
                                        py: 1,
                                        pr: 1,
                                        borderTop: '1px solid',
                                        borderColor: 'divider',
                                    }}
                                >
                                    <div>
                                        <IconButton size="sm" variant="plain" color="neutral">
                                            <FormatBoldRoundedIcon />
                                        </IconButton>
                                        <IconButton size="sm" variant="plain" color="neutral">
                                            <FormatItalicRoundedIcon />
                                        </IconButton>
                                        <IconButton size="sm" variant="plain" color="neutral">
                                            <StrikethroughSRoundedIcon />
                                        </IconButton>
                                        <IconButton size="sm" variant="plain" color="neutral">
                                            <FormatListBulletedRoundedIcon />
                                        </IconButton>
                                    </div>
                                    <Button
                                        size="sm"
                                        color="primary"
                                        sx={{ alignSelf: 'center', borderRadius: 'sm' }}
                                        endDecorator={<SendRoundedIcon />}
                                    >
                                        Send
                                    </Button>
                                </Stack>
                            }
                            sx={{
                                '& textarea:first-of-type': {
                                    minHeight: 72,
                                },
                            }}
                        />
                    </FormControl>
                </Box>
            </Box>
        </>
    )
}