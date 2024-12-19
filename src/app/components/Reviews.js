import { Avatar, Card, CardContent, CardHeader, Rating, Typography } from "@mui/material";

export default function Reviews({ reviews }) {
    return (
        reviews && <div>
            {reviews?.map(review => (
                <Card key={review.id}
                    variant="outlined"
                    sx={{ my: 2, width: "100%", overflow: 'auto' }}>
                    <CardHeader avatar={<Avatar />}
                        title={
                            <Typography variant="h5">
                                {`${review.user?.prefecture?.name || ""}${review.user?.city || ""}の${review.user?.gender?.name || ""}`}
                            </Typography>}
                    />
                    <CardContent>
                        <Typography>{review.comment}</Typography>
                        <Rating value={review.rate} readOnly />
                    </CardContent>
                </Card>
            )
            )}
        </div>
    )
}