import { Card } from "@mui/material";

export default function ReviewList({ reviews }) {
    return (
        <div>
            {reviews?.map(review => (
                <Card key={review.id}>
                    {review.id}
                </Card>
            )
            )}
        </div>

    )
}