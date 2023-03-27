import classNames from "classnames";
import { useFormikContext } from "formik";
import { useMemo, useState } from "react";

export function Rate({
  count, color
}) {
  const [hoverRating, setHoverRating] = useState(0);

  const { values, setValues } = useFormikContext();

  const clickRatingHandler = (elem) => {
    setValues((prev) => ({
      ...prev,
      rating: elem
    }));
  };

  const getColor = (elem) => {
    if (hoverRating >= elem) return color.filled;
    if (!hoverRating && values.rating >= elem) return color.filled;
    return color.unfilled;
  };

  const starRating = useMemo(() => Array(count)
    .fill(0)
    .map((_, ind) => ind + 1), [values.rating, hoverRating]);

  return (
    <div>
      {starRating.map((elem) => (
        <i
          key={elem}
          className={classNames(
            "fa-solid fa-star"
          )}
          onClick={() => clickRatingHandler(elem)}
          style={{ color: getColor(elem), cursor: "pointer" }}
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
