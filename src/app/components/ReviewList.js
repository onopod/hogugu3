export default function ReviewList({ reviews }) {
    return (
        <div>
            {reviews?.map(review => (
                <div key={review.id}>{review.id}</div>
            )
            )}
        </div>

    )
}