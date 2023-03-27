import { useMutation, useQueryClient } from "@tanstack/react-query";
import classNames from "classnames";
import { useSelector } from "react-redux";
import { dogFoodApi } from "../../api/DogFoodApi";
import { getTokenSelector, getUserSelector } from "../../redux/slices/userSlice";
import { formatDate, getQueryKeyReviewsByProductId } from "../../utils/functions";
import { Rating } from "../Rating/Rating";
import styles from "./ReviewsItem.module.css";

export function ReviewsItem({ review }) {
  const token = useSelector(getTokenSelector);
  const user = useSelector(getUserSelector);

  const isUserReview = review.author.email === user.email;

  const queryClient = useQueryClient();
  const { mutateAsync } = useMutation({
    mutationFn: () => dogFoodApi.deleteReview(review.product, token, review['_id']),
    onSuccess: () => queryClient.invalidateQueries(getQueryKeyReviewsByProductId(review.product)),
  });

  const deleteUserReview = async () => {
    await mutateAsync();
  };

  return (
    <>
      <div className={styles.reviewsItem}>
        <div className={styles.containerImage}>
          <img src={review.author.avatar} alt={review.author.name} />
        </div>
        <div className={styles.containerRating}>
          <p>
            <span>{review.author.name}</span>
            <span>{formatDate(review.updated_at)}</span>
          </p>
          <p>
            <Rating rating={review.rating} />
          </p>
        </div>
        <div className={styles.containerText}>
          {review.text}
        </div>
        {isUserReview && (
          <i
            className={classNames(
              "fa-regular fa-trash-can",
              [styles.icoDelete]
            )}
            onClick={deleteUserReview}
          />
        )}
      </div>
      <hr />
    </>
  );
}
