import classNames from "classnames";
import { useMemo, useState } from "react";

export function Rate({
  rating, setRating, count, color
}) {
  const [hoverRating, setHoverRating] = useState(0);
  // console.log({ rating });

  const getColor = (elem) => {
    if (hoverRating >= elem) return color.filled;
    if (!hoverRating && rating >= elem) return color.filled;
    return color.unfilled;
  };

  const starRating = useMemo(() => Array(count)
    .fill(0)
    .map((_, ind) => ind + 1), [rating, hoverRating]);

  return (
    <div>
      {starRating.map((elem) => (
        <i
          key={elem}
          className={classNames(
            "fa-solid fa-star"
          )}
          onClick={() => setRating(elem)}
          style={{ color: getColor(elem) }}
          onMouseEnter={() => setHoverRating(elem)}
          onMouseLeave={() => setHoverRating(0)}
        />
      ))}
    </div>
  );
}

Rate.defaultProps = {
  count: 5,
  color: {
    filled: "#f5eb3b",
    unfilled: "#dcdcdc"
  }
};
