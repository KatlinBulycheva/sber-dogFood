import classNames from "classnames";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  addProductToCart,
  getCartSelector,
  removeProductFromCart,
} from "../../redux/slices/cartSlice";
import {
  addProductToFavorites,
  getFavoritesSelector,
  removeProductFromFavorites,
} from "../../redux/slices/favoritesSlice";
import { getUserSelector } from "../../redux/slices/userSlice";
import { getRating } from "../../utils/functions";
import styles from "./ProductCard.module.css";

export function ProductCard({
  pictures,
  name,
  price,
  wight,
  discount,
  tags,
  id,
  author,
  reviews
}) {
  const dispatch = useDispatch();

  const user = useSelector(getUserSelector);
  const isUserProduct = user.email === author.email;

  const cart = useSelector(getCartSelector);
  const productWithActiveCart = cart.find((product) => product.id === id);

  const favorites = useSelector(getFavoritesSelector);
  const productWithActiveLike = favorites.find((productId) => productId === id);

  const cartOfProductHandler = (e) => {
    e.preventDefault();
    if (productWithActiveCart) dispatch(removeProductFromCart(id));
    else dispatch(addProductToCart(id));
  };

  const likeOfProductHandler = (e) => {
    e.preventDefault();
    if (productWithActiveLike) dispatch(removeProductFromFavorites(id));
    else dispatch(addProductToFavorites(id));
  };

  const [hoverStyles, setHoverStyles] = useState({
    [styles.noActiveLike]: !productWithActiveLike
  });

  const mouseEnterHandler = () => {
    setHoverStyles({
      [styles.noActiveLikeDisplay]: !productWithActiveLike
    });
  };

  const mouseLeaveHandler = () => {
    setHoverStyles({
      [styles.noActiveLike]: !productWithActiveLike
    });
  };

  return (
    <Link to={`./${id}`}>
      <div
        className={styles.card}
        onMouseEnter={mouseEnterHandler}
        onMouseLeave={mouseLeaveHandler}
      >
        <div className={styles.cardImg}>
          <img src={pictures} alt={name} />
          <span className={styles.offers}>
            {!!discount && (
            <span className={styles.discount}>-{discount}%</span>
            )}
            {tags.includes("new") && (
            <span className={styles.new}>Новинка</span>
            )}
          </span>
          {!isUserProduct && (
          <span
            className={classNames(
              styles.cardLike,
              { [styles.activeLike]: !!productWithActiveLike },
              hoverStyles
            )}
            onClick={likeOfProductHandler}
            title={productWithActiveLike ? "Удалить из избранного" : "Добавить в избранное"}
          >
            <i className="fa-solid fa-heart" />
          </span>
          )}
        </div>
        <div className={styles.cardBody}>
          <h3>
            <div>
              {`${Math.round(price * (1 - discount * 0.01))} ₽   `}
              {!!discount && (
              <span className={styles.oldPrice}>{price} ₽</span>
              )}
            </div>
            {!isUserProduct && (
            <span
              className={classNames(
                styles.cardBodyCart,
                { [styles.activeCart]: !!productWithActiveCart },
                { [styles.noActiveCart]: !productWithActiveCart }
              )}
              onClick={cartOfProductHandler}
              title={productWithActiveCart ? "Удалить из корзины" : "Добавить в корзину"}
            >
              <i className="fa-solid fa-cart-shopping" />
            </span>
            )}
          </h3>
          <p className={styles.containerStar}>
            <i
              className={classNames(
                "fa-solid fa-star",
                { [styles.isActiveStar]: !!reviews.length },
                { [styles.isNoActiveStar]: !reviews.length }
              )}
            />
            <span>
              {reviews.length ? `  ${getRating(reviews)}` : `  0`}
            </span>
          </p>
          <p className={styles.name}>{`${name}, ${wight}`}</p>
        </div>
      </div>
    </Link>
  );
}
