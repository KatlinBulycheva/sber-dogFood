import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { dogFoodApi } from "../../api/DogFoodApi";
import { getTokenSelector } from "../../redux/slices/userSlice";
import { formatDate, getQueryKeyUser } from "../../utils/functions";
import { Rating } from "../Rating/Rating";
import styles from "./ReviewsItem.module.css";

export function ReviewsItem({
  text, rating, updated_at: updatedAt, author: authorId
}) {
  const token = useSelector(getTokenSelector);

  const { data: author } = useQuery({
    queryKey: getQueryKeyUser(authorId),
    queryFn: () => dogFoodApi.getUserById(authorId, token),
    enabled: !!token
  });

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
      </div>
      <hr />
    </>
  );
}
