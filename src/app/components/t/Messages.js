"use client"
import { Avatar, Box, Button, FormControl, Stack, TextField, Typography } from "@mui/material";
import { format } from "date-fns";

export default function Messages({ messages, register, handleSubmit, onSubmit }) {
    const d = new Date();

    return (
        <>
            <Box className="message-area" sx={{ m: 2 }}>
                <Stack spacing={1} direction="column-reverse">
                    {messages ? messages.filter(message => message.messageStatusId != 3).map(message => (
                        <Box key={message.id}>
                            <Stack spacing={1}
                                direction={message.messageStatusId == 2 ? "row-reverse" : "row"}>
                                {message.messageStatusId == 1 ?
                                    <Avatar src={message.user.imageFileName ? `/userImg/${message.user.id}/${message.user.imageFileName}` : ""}>
                                        {message.user.name ? message.user.name[0].toUpperCase() : ""}
                                    </Avatar>
                                    : message.messageStatusId == 2 ?
                                        <Avatar src={message.therapist.imageFileName ? `/therapistImg/${message.therapist.id}/${message.therapist.imageFileName}` : ""}>
                                            {message.therapist.name ? message.therapist.name[0].toUpperCase() : ""}
                                        </Avatar>
                                        :
                                        <Avatar>Info</Avatar>

                                }
                                <Stack >
                                    {message.message.split(/\n/).map((m, idx) => <Typography key={idx}>{m}</Typography>)}
                                </Stack>
                            </Stack>
                            <Stack direction={message.messageStatusId == 2 ? "row-reverse" : "row"}>
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
                            <TextField
                                id="message"
                                {...register('message')}
                                placeholder="Type something here…"
                                aria-label="Message"
                            />
                        </FormControl>
                        <FormControl>
                            <Button type="submit">送信</Button>
                        </FormControl>
                    </form>
                </Box>
            </Box>
        </>
    )
}