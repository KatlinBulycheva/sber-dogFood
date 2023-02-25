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
import productCardStyles from "./ProductCard.module.css";

export function ProductCard({
  pictures,
  name,
  price,
  wight,
  discount,
  tags,
  id
}) {
  const dispatch = useDispatch();
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
    [productCardStyles.noActiveLike]: !productWithActiveLike
  });

  const mouseEnterHandler = () => {
    setHoverStyles({
      [productCardStyles.noActiveLikeDisplay]: !productWithActiveLike
    });
  };

  const mouseLeaveHandler = () => {
    setHoverStyles({
      [productCardStyles.noActiveLike]: !productWithActiveLike
    });
  };

  return (
    <Link to={`./${id}`}>
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
              productCardStyles.cardLike,
              { [productCardStyles.activeLike]: !!productWithActiveLike },
              hoverStyles
            )}
            onClick={likeOfProductHandler}
            title={productWithActiveLike ? "Удалить из избранного" : "Добавить в избранное"}
          >
            <i className="fa-solid fa-heart" />
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
          </h3>
          <p className={productCardStyles.wight}>{wight}</p>
          <p className={productCardStyles.name}>{name}</p>
        </div>
      </div>
    </Link>
  );
}
