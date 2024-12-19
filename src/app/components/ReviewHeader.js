import * as React from 'react';
import { Avatar, Card, CardContent, Divider, Typography, CardHeader } from '@mui/material';
import {
    Favorite, StarIcon, CommentIcon, DirectionsWalkIcon,
    CurrencyYenIcon, MenuBookIcon, BusinessCenterIcon
} from "@/app/icons";

export default function ReviewHeader({ therapist }) {
    return (
        <Card
            variant="outlined"
            sx={{
                my: 2,
                width: "100%",
                overflow: 'auto',
            }}
        >
            <CardHeader
                avatar={<Avatar alt={therapist.name}
                    src={therapist.imageFileName ? `/therapistImg/${therapist.id}/${therapist.imageFileName}` : ""}
                    sx={{ width: 64, height: 64 }}>
                    {therapist?.name && therapist.name.length > 0 ? therapist.name.toUpperCase() : ""}
                </Avatar>}

                title={<Typography variant="h5">{therapist.name}</Typography>}
                subheader={<><StarIcon /> 5.0 (143件) <Favorite /> 117</>}
            />
            <CardContent>
                <Typography>
                    <BusinessCenterIcon />施術歴：{therapist.workYear}年
                </Typography>
                <Typography>
                    <CommentIcon />{therapist.comment}
                </Typography>
                <Typography>
                    <DirectionsWalkIcon />出発地：{therapist?.prefecture?.name || "-"}／{therapist.city || "-"}
                </Typography>
                <Divider sx={{ my: 1 }} />
                <Typography>
                    <CurrencyYenIcon />もみほぐし90分12,0000円～
                    <MenuBookIcon />メニュー
                </Typography>
            </CardContent>
        </Card>
    )
}