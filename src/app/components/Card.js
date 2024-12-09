import FavoriteIcon from '@mui/icons-material/Favorite';
import { Box, Button, Chip } from "@mui/material";
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import * as React from 'react';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


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

export default function TherapistCard({ therapist }) {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card key={therapist.id}>

      <CardHeader
        avatar={
          <Avatar alt={therapist.name} src="/avatar.jpg" sx={{ width: 64, height: 64 }} />
        }
        action={
          <IconButton size="large" >
            <FavoriteIcon />
          </IconButton>
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
        <Box><span>返答率 - </span><span>返答時間 - </span> </Box>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>{therapist.comment}</Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Button href={`/therapist/${therapist.id}`}> 詳細 </Button>

        <IconButton aria-label="add to favorites">


        </IconButton>
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