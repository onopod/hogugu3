export default function Review({ review }) {
    return (
        <div>
            レート：{review.rate}点
            コメント：{review.comment}
        </div>
    );
}