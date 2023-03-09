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

export function FavoritesItem({ product }) {
  const dispatch = useDispatch();
  const user = useSelector(getUserSelector);

  const cart = useSelector(getCartSelector);
  const productWithActiveCart = cart.find((item) => item.id === product['_id']);

  const cartOfProductHandler = (e) => {
    e.preventDefault();
    if (productWithActiveCart) dispatch(removeProductFromCart(product['_id']));
    else dispatch(addProductToCart(product['_id']));
  };

  const removeFromFavorites = (e) => {
    e.preventDefault();
    dispatch(removeProductFromFavorites(product['_id']));
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

  if ('name' in product) {
    const isUserProduct = user.email === product.author.email;

    return (
      <Link to={`/products/${product['_id']}`}>
        <div
          className={productCardStyles.card}
          onMouseEnter={mouseEnterHandler}
          onMouseLeave={mouseLeaveHandler}
        >
          <div className={productCardStyles.cardImg}>
            <img src={product.pictures} alt={product.name} />
            <span className={productCardStyles.offers}>
              {!!product.discount && (
              <span className={productCardStyles.discount}>-{product.discount}%</span>
              )}
              {product.tags.includes("new") && (
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
                {`${Math.round(product.price * (1 - product.discount * 0.01))} ₽   `}
                {!!product.discount && (
                <span className={productCardStyles.oldPrice}>{product.price} ₽</span>
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
                  { [productCardStyles.isActiveStar]: !!product.reviews.length },
                  { [productCardStyles.isNoActiveStar]: !product.reviews.length }
                )}
              />
              <span>
                {product.reviews.length ? `  ${getRating(product.reviews)}` : `  0`}
              </span>
            </p>
            <p className={productCardStyles.name}>{`${product.name}, ${product.wight}`}</p>
          </div>
        </div>
      </Link>
    );
  }
  return (
    <div
      className={productCardStyles.card}
      onMouseEnter={mouseEnterHandler}
      onMouseLeave={mouseLeaveHandler}
    >
      <div className={productCardStyles.cardImg}>
        <img src="https://cdn-icons-png.flaticon.com/512/4812/4812459.png" alt="Фото продукта" />
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
        <h3>Товар удален</h3>
        <p className={productCardStyles.containerStar} />
        <p className={productCardStyles.name} />
      </div>
    </div>
  );
}
