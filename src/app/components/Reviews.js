import { getReviews } from "@/app/actions";
import { Avatar, Button, Card, CardContent, CardHeader, Rating, Typography } from "@mui/material";
import Link from "next/link";

export default async function Reviews({ id, more = false }) {
    const reviews = await getReviews(id)

    return (
        <>
            {reviews && <div>
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
            </div>}
            {more &&
                <Link href={`/therapist/${id}/review`}>
                    <Button fullWidth>もっと見る</Button>
                </Link>
            }
        </>
    )
}