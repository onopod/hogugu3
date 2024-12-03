import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Box, Link } from "@mui/material";

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';

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

export default function RecipeReviewCard() {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ maxWidth: 345 }}>

      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title="Shrimp and Chorizo Paella"
        subheader="September 14, 2016"
      />

      <CardMedia
        component="img"
        height="194"
        image="https://mui.com/static/images/cards/paella.jpg"

        alt="Paella dish"
      />
      <CardContent>
        <h3>山田 花子 </h3>
        <Box><span>返答率 - </span><span>返答時間 - </span> </Box>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          世田谷から出発🛫

          ヨガインストラクターによる
          タイ古式マッサージ🇹🇭🧘‍♂️✨

          肩・首・頭の疲れ、
          腰痛お任せください！
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Link href="/therapist"> 詳細 </Link>

        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
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
          <Typography sx={{ marginBottom: 2 }}> もみほぐし: 60min 6000円 </Typography>
          <Typography sx={{ marginBottom: 2 }}> もみほぐし: 60min 6000円 </Typography>
          <Typography sx={{ marginBottom: 2 }}> もみほぐし: 60min 6000円 </Typography>
        </CardContent>
      </Collapse>
    </Card >
  );
}