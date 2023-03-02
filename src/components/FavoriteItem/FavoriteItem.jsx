import classNames from "classnames";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  addProductToCart,
  getCartSelector,
  removeProductFromCart,
} from "../../redux/slices/cartSlice";
import { removeProductFromFavorites } from "../../redux/slices/favoritesSlice";
import { getUserSelector } from "../../redux/slices/userSlice";
import { getRating } from "../../utils/functions";
import productCardStyles from "../ProductCard/ProductCard.module.css";
import styles from "./FavoriteItem.module.css";

export function FavoritesItem({
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

  const cartOfProductHandler = (e) => {
    e.preventDefault();
    if (productWithActiveCart) dispatch(removeProductFromCart(id));
    else dispatch(addProductToCart(id));
  };

  const removeFromFavorites = (e) => {
    e.preventDefault();
    dispatch(removeProductFromFavorites(id));
  };

  const [hoverStyles, setHoverStyles] = useState();

  const mouseEnterHandler = () => {
    setHoverStyles({
      [styles.displayDelete]: true
    });
  };

  const mouseLeaveHandler = () => {
    setHoverStyles({
      [styles.displayDelete]: false
    });
  };

  return (
    <Link to={`/products/${id}`}>
      <div
        className={productCardStyles.card}
        onMouseEnter={mouseEnterHandler}
        onMouseLeave={mouseLeaveHandler}
      >
        <div className={productCardStyles.cardImg}>
          <img src={pictures} alt={name} />
          <span className={productCardStyles.offers}>
            {!!discount && (
            <span className={productCardStyles.discount}>-{discount}%</span>
            )}
            {tags.includes("new") && (
            <span className={productCardStyles.new}>Новинка</span>
            )}
          </span>
          <span
            className={classNames(
              styles.deleteCardLike,
              hoverStyles
            )}
            onClick={removeFromFavorites}
            title="Удалить из избранного"
          >
            <i className="fa-solid fa-circle-xmark" />
          </span>
        </div>
        <div className={productCardStyles.cardBody}>
          <h3>
            <div>
              {`${Math.round(price * (1 - discount * 0.01))} ₽   `}
              {!!discount && (
              <span className={productCardStyles.oldPrice}>{price} ₽</span>
              )}
            </div>
            {!isUserProduct && (
            <span
              className={classNames(
                productCardStyles.cardBodyCart,
                { [productCardStyles.activeCart]: !!productWithActiveCart },
                { [productCardStyles.noActiveCart]: !productWithActiveCart }
              )}
              onClick={cartOfProductHandler}
              title={productWithActiveCart ? "Удалить из корзины" : "Добавить в корзину"}
            >
              <i className="fa-solid fa-cart-shopping" />
            </span>
            )}
          </h3>
          <p className={productCardStyles.containerStar}>
            <i
              className={classNames(
                "fa-solid fa-star",
                { [productCardStyles.isActiveStar]: !!reviews.length },
                { [productCardStyles.isNoActiveStar]: !reviews.length }
              )}
            />
            <span>
              {reviews.length ? `  ${getRating(reviews)}` : `  0`}
            </span>
          </p>
          <p className={productCardStyles.name}>{`${name}, ${wight}`}</p>
        </div>
      </div>
    </Link>

  );
}
