"use client"

import { ExpandMoreIcon, FavoriteIcon } from "@/app/icons";
import { Avatar, Box, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Chip, Collapse, IconButton, Typography } from "@mui/material";
import { pink } from '@mui/material/colors';
import { styled } from '@mui/material/styles';
import { subWeeks } from "date-fns";
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

  return (
    <Card key={therapist.id}>

      <CardHeader
        avatar={<Avatar alt={therapist.name}
          src={therapist.imageFileName ? `/therapistImg/${therapist.id}/${therapist.imageFileName}` : ""}
          sx={{ width: 64, height: 64 }}>{therapist.name[0].toUpperCase()}</Avatar>}
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
        title={therapist.name}
        subheader={
          <>
            <Chip label="もみほぐし" size="small" color="success" />
            <Chip label="オイル" size="small" />
          </>
        }
      />
      <CardMedia
        component="img"
        height="194"
        image="/paella.jpg"
        alt="施術イメージ"
      />
      <CardContent>
        <Box>
          {new Date(therapist.created) > subWeeks(new Date(), 4) ? "NEW" : ""}
          <span>返答率 {therapist.reservations.length == 0 ?
            "-" :
            `${(therapist.reservations.filter(reservation => reservation.replyDt != null).length / therapist.reservations.length * 100).toFixed(0)}%`
          }</span><span>返答時間 {therapist.reservations.length == 0 ?
            "-" :
            `${(therapist.reservations.filter(reservation => reservation.replyDt != null).map(reservation => new Date(reservation.replyDt) - new Date(reservation.created)).reduce((acc, curr, _, arr) => acc + curr / arr.length, 0) / (1000 * 60))}分`
          }</span>
          <span>出発地 {therapist.prefecture ? therapist.prefecture.name : "-"}／{therapist.city || "-"}</span>
          <span>施術歴 {therapist.workYear ? therapist.workYear : "-"}年</span>
        </Box>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>{therapist.comment}</Typography>
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