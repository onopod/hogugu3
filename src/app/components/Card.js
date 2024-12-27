"use client"

import { AccessTimeIcon, ExpandMoreIcon, FavoriteIcon, MenuBookIcon, QuestionAnswerIcon, StarIcon } from "@/app/icons";
import CommentIcon from '@mui/icons-material/Comment';
import MapIcon from '@mui/icons-material/Map';
import WorkIcon from '@mui/icons-material/Work';
import { Avatar, Badge, Box, Button, Card, CardActions, CardContent, CardHeader, Collapse, IconButton, Stack, Typography } from "@mui/material";
import { pink, yellow } from '@mui/material/colors';
import { styled } from '@mui/material/styles';
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;

  return <IconButton {...other} />;
})(({ theme }) => ({
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
  variants: [
    {
      props: ({ expand }) => !expand,
      style: {
        transform: 'rotate(0deg)',
      },
    },
    {
      props: ({ expand }) => !!expand,
      style: {
        transform: 'rotate(180deg)',
      },
    },
  ],
}));

export default function TherapistCard({ therapist, handleFavoriteClick }) {
  const { data: session } = useSession();

  const router = useRouter();
  const [expanded, setExpanded] = useState(false);
  const [favorite, setFavorite] = useState(therapist.favorites ? therapist.favorites.length : null);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const avatar = (
    <Avatar alt={therapist.name}
      src={therapist.therapistView.imageFilePath}
      sx={{ width: 64, height: 64 }}>
      {therapist.therapistView.name0}
    </Avatar>
  )
  const badgedAvatar = therapist.therapistView.isNew ? (
    <Badge badgeContent="new" color="secondary" sx={{ mr: 1 }}>
      {avatar}
    </Badge>
  ) : avatar;

  return (
    <Card key={therapist.id} variant="outlined"
      sx={{ my: 2, width: "100%", overflow: 'auto' }}>
      <CardHeader
        avatar={badgedAvatar}
        action={
          session?.user?.role == "user" ?
            <IconButton size="large" >
              <FavoriteIcon sx={favorite ? { color: pink[300] } : {}} onClick={() => {
                setFavorite(favorite ? 0 : 1)
                handleFavoriteClick(therapist.id)
              }} />
            </IconButton>
            : ""
        }
        title={<Typography variant="h5">{therapist.name}</Typography>}
        subheader={
          <Stack spacing={0.5}>
            <Stack direction="row" spacing={1}>
              <Box sx={{ display: "flex", verticalAlign: "center" }}>
                <StarIcon sx={{ color: yellow[700] }} />
                <Typography>
                  {therapist.therapistView.reviewRate} ({therapist.therapistView.reviewCount})
                </Typography>
              </Box>
              <Box sx={{ display: "flex", verticalAlign: "center" }}>
                <MapIcon />
                <Typography>
                  {therapist.therapistView.prefectureAndCity}
                </Typography>
              </Box>
            </Stack>
            <Stack direction="row" spacing={1}>
              <Box sx={{ display: "flex", verticalAlign: "center" }}>
                <Typography>{therapist.gender?.name}</Typography>
              </Box>
              <QuestionAnswerIcon />
              <Box sx={{ display: "flex", verticalAlign: "center" }}>
                <Typography>{therapist.therapistView.replyRateFixed}%</Typography>
              </Box>
              <Box sx={{ display: "flex", verticalAlign: "center" }}>
                <Typography>{therapist.therapistView.replyTime}分</Typography>
              </Box>
              <WorkIcon />
              <Box sx={{ display: "flex", verticalAlign: "center" }}>
                <Typography>{therapist.workYear || "- "}年</Typography>
              </Box>
            </Stack>
          </Stack>
        }
      />
      <CardContent>
        <Stack spacing={1}>
          <Stack direction="row" spacing={1}>
            <AccessTimeIcon />
            <Box sx={{ display: "flex", verticalAlign: "center" }}>
              <Typography>
                {therapist.therapistView.lastLogin}
              </Typography>
            </Box>
          </Stack>
          <Stack direction="row" spacing={1}>
            <Box sx={{ display: "flex", verticalAlign: "center" }}>
              <Typography>
                {therapist?.schedules?.length > 0 ? therapist.schedules.map(s => `${s.startDt > new Date() ? format(s.startDt, "yyyy/MM/dd kk:mm") : "本日受付中"} - ${format(s.endDt, "kk:mm")}`).join(" ") : ""}
              </Typography>
            </Box>
          </Stack>
          <Stack direction="row" spacing={1}>
            <CommentIcon />
            <Box sx={{ display: "flex", verticalAlign: "center" }}>
              <Typography>{therapist.comment}</Typography>
            </Box>
          </Stack>
          <Stack direction="row" spacing={1}>
            <MenuBookIcon />
            <Box sx={{ display: "flex", verticalAlign: "center" }}>
              <Typography>メニュー一覧</Typography>
            </Box>
          </Stack>
        </Stack>
      </CardContent>
      <CardActions disableSpacing>
        <Button onClick={() => router.push(`/therapist/${therapist.id}`)}> 詳細 </Button>
        <IconButton aria-label="add to favorites" />
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions >
      <Collapse in={expanded} timeout="auto" unmountOnExit >
        <CardContent>
          {therapist.menus && therapist.menus.map((menu, idx) => (
            <Typography key={idx} sx={{ marginBottom: 2 }}>
              {menu.menu.name}: {menu.treatmentTime}min {menu.price}円
            </Typography>
          )
          )}
        </CardContent>
      </Collapse>
    </Card >
  );
}