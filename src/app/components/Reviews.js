import { Card } from "@mui/material";

export default function Reviews({ reviews }) {
    return (
        reviews && <div>
            {reviews?.map(review => (
                <Card key={review.id}>
                    {review.id}
                </Card>
            )
            )}
        </div>
    )
}