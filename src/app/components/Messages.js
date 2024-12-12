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
import { format } from "date-fns";

export default function Messages({ messages }) {
    return (
        <>
            <Box className="message-area" sx={{ m: 2 }}>
                <Stack spacing={1} direction="column-reverse">
                    {messages ? messages.map(message => (
                        <Box key={message.id}>
                            <Stack spacing={1}
                                direction={message.isUserSend == true ? "row-reverse" : "row"}>
                                {message.isUserSend == true ?
                                    <Avatar src={message.user.imageFileName ? `/userImg/${message.user.id}/${message.user.imageFileName}` : ""}>
                                        {message.user.name ? message.user.name[0].toUpperCase() : ""}
                                    </Avatar>
                                    :
                                    <Avatar src={message.therapist.imageFileName ? `/therapistImg/${message.therapist.id}/${message.therapist.imageFileName}` : ""}>
                                        {message.therapist.name ? message.therapist.name[0].toUpperCase() : ""}
                                    </Avatar>
                                }
                                <Stack >
                                    <Typography>{message.message}</Typography>
                                </Stack>
                            </Stack>
                            <Stack direction={message.isUserSend == true ? "row-reverse" : "row"}>
                                <Typography>{format(message.created, "yyyy/MM/dd kk:mm")}</Typography>
                            </Stack>
                        </Box>
                    )) : ""}
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