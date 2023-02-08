import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import {
  addProductToCart,
  getCartSelector,
  removeProductFromCart,
} from "../../redux/slices/cartSlice";
import productCardStyles from "./ProductCard.module.css";

export function ProductCard({
  pictures, name, price, wight, id
}) {
  const dispatch = useDispatch();
  const cart = useSelector(getCartSelector);
  const productWithActiveCart = cart.find((product) => product.id === id);

  const cartOfProductHandler = () => {
    if (productWithActiveCart) {
      dispatch(removeProductFromCart(id));
    } else {
      dispatch(addProductToCart(id));
    }
  };

  return (
    <div className={productCardStyles.card}>
      <div className={productCardStyles.cardImg}>
        <img src={pictures} alt={name} />
      </div>
      <div className={productCardStyles.cardBody}>
        <h3>
          {`${price} ₽`}{" "}
          <span
            className={classNames(
              productCardStyles.cardBodyCart,
              { [productCardStyles.activeCart]: !!productWithActiveCart },
              { [productCardStyles.noActiveCart]: !productWithActiveCart }
            )}
            onClick={cartOfProductHandler}
          >
            <i className="fa-solid fa-cart-shopping" />
          </span>
        </h3>
        <p className={productCardStyles.wight}>{wight}</p>
        <p className={productCardStyles.name}>{name}</p>
      </div>
    </div>
  );
}
