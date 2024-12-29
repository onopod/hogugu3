import { getTherapist } from "@/app/actions";

import {
    AccessTimeIcon,
    CommentIcon,
    QuestionAnswerIcon,
    StarIcon
} from "@/app/icons";
import { Avatar, Box, Card, CardContent, CardHeader, Stack, Typography } from '@mui/material';
import "swiper/css";
export default async function Therapist({ id }) {
    const therapist = await getTherapist(id)
    return (
        <Card variant="outlined"
            sx={{ my: 2, width: "100%", overflow: 'auto' }}>
            <CardHeader
                avatar={<Avatar alt={therapist.name}
                    src={therapist.imageFilePath}
                    sx={{ width: 96, height: 96 }}>
                    {therapist.name0}
                </Avatar>}
                title={<Typography variant="h5">{therapist.name}</Typography>}
                subheader={
                    <Stack>
                        <Stack direction="row" spacing={1}>
                            <Box><StarIcon />{therapist.fixedRateAverage} ({therapist.reviewCount})</Box>
                            <Box><span sx={{ ml: 1 }} >{therapist.therapistView?.prefectureAndCity}</span></Box>
                        </Stack>
                        <Stack direction="row" spacing={1}>
                            <Box><QuestionAnswerIcon />{therapist.fixedReplyRate}%</Box>
                            <Box><AccessTimeIcon />{therapist.fixedReplyTime}分</Box>
                            <Box>{therapist.gender?.name}</Box>
                        </Stack>
                    </Stack>
                }
            />
            <CardContent sx={{ pt: 0 }}>
                <Typography>
                    <CommentIcon />{therapist.comment}
                </Typography>
            </CardContent>
        </Card>
    )
}