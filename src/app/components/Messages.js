"use client"
import { Stack } from '@mui/joy';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import Textarea from '@mui/joy/Textarea';
import { Avatar, Typography } from "@mui/material";

import SendRoundedIcon from '@mui/icons-material/SendRounded';
import { format } from "date-fns";

export default function Messages({ messages, register, handleSubmit, onSubmit }) {
    const d = new Date();

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
                                <Typography>{format(message.created, (format(new Date(), "yyyy/MM/dd") == format(message.created, "yyyy/MM/dd") ? "" : "yyyy/MM/dd ") + "kk:mm")}</Typography>
                            </Stack>
                        </Box>
                    )) : ""}
                </Stack>
            </Box>
            <Box className="message-input-area">
                <Box sx={{ px: 2, pb: 3 }}>
                    <form onSubmit={handleSubmit(onSubmit)}>

                        <FormControl>
                            <Textarea
                                id="message"
                                {...register('message')}
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
                                        <Button
                                            size="sm"
                                            type="submit"
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
                    </form>
                </Box>
            </Box>
        </>
    )
}