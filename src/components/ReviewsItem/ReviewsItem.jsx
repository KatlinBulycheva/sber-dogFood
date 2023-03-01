import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import classNames from "classnames";
import { useSelector } from "react-redux";
import { dogFoodApi } from "../../api/DogFoodApi";
import { getTokenSelector, getUserSelector } from "../../redux/slices/userSlice";
import { formatDate, getQueryKeyProduct, getQueryKeyUser } from "../../utils/functions";
import { Rating } from "../Rating/Rating";
import styles from "./ReviewsItem.module.css";

export function ReviewsItem({
  id, text, rating, updated_at: updatedAt, author: authorId, productId
}) {
  const token = useSelector(getTokenSelector);
  const user = useSelector(getUserSelector);

  const { data: author } = useQuery({
    queryKey: getQueryKeyUser(authorId),
    queryFn: () => dogFoodApi.getUserById(authorId, token),
    enabled: !!token
  });

  const isUserReview = (author && author.email) === user.email;

  const queryClient = useQueryClient();
  const { mutateAsync } = useMutation({
    mutationFn: () => dogFoodApi.deleteReview(productId, token, id),
    onSuccess: () => queryClient.invalidateQueries(getQueryKeyProduct(productId)),
  });

  const deleteUserReview = async () => {
    await mutateAsync();
  };

  return (
    <>
      <div className={styles.reviewsItem}>
        <div className={styles.containerImage}>
          {author && <img src={author.avatar} alt={author.name} />}
        </div>
        <div className={styles.containerRating}>
          <p>
            <span>{author && author.name}</span>
            <span>{formatDate(updatedAt)}</span>
          </p>
          <p>
            <Rating rating={rating} />
          </p>
        </div>
        <div className={styles.containerText}>
          {text}
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
