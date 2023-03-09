import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { dogFoodApi } from "../../api/DogFoodApi";
import { getTokenSelector } from "../../redux/slices/userSlice";
import { getQueryKeyReviewsByProductId } from "../../utils/functions";
import { withQuery } from "../HOC/withQuery";
import { ReviewsItem } from "../ReviewsItem/ReviewsItem";

const ReviewsListInner = withQuery(({ reviews }) => reviews.map((review) => (
  <ReviewsItem
    review={review}
    key={review['_id']}
  />
)).reverse());

export function ReviewsList({ productId }) {
  const token = useSelector(getTokenSelector);

  const {
    data: reviews, isLoading, isError, error, refetch
  } = useQuery({
    queryKey: getQueryKeyReviewsByProductId(productId),
    queryFn: () => dogFoodApi.getReviewsByProductId(token, productId),
    enabled: !!token
  });

  return (
    <ReviewsListInner
      reviews={reviews}
      isLoading={isLoading}
      isError={isError}
      error={error}
      refetch={refetch}
    />
  );
}
