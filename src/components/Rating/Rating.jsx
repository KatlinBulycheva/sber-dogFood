import classNames from "classnames";
import stylesDetail from "../Pages/ProductDetail/ProductDetailInner/ProductDetailInner.module.css";

export function Rating({ rating }) {
  const burningStars = [];
  for (let index = 0; index < 5; index += 1) {
    if (index < rating) burningStars.push(true);
    else burningStars.push(false);
  }

  return (
    <>
      {burningStars.map((isBurning, index) => (
        <i
          className={classNames(
            "fa-solid fa-star",
            { [stylesDetail.isActiveStar]: isBurning },
            { [stylesDetail.isNoActiveStar]: !isBurning }
          )}
          // eslint-disable-next-line react/no-array-index-key
          key={index}
        />
      ))}
    </>
  );
}
