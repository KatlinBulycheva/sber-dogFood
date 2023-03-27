import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  counterDecrementProduct,
  counterIncrementProduct,
  getCartSelector,
  removeProductFromCart,
  setChecked,
  setUnChecked,
} from "../../redux/slices/cartSlice";
import { Button } from "../Button/Button";
import cartItemStyles from "./CartItem.module.css";

export function CartItem({ product }) {
  const dispatch = useDispatch();
  const cart = useSelector(getCartSelector);
  const productCart = cart.find(
    (productItem) => productItem.id === product["_id"]
  );
  const priceWithDiscount = Math.round(
    product.price * (1 - product.discount * 0.01)
  );

  const productIsChecked = () => {
    if (!productCart.isChecked) dispatch(setChecked(product["_id"]));
    else dispatch(setUnChecked(product["_id"]));
  };

  const removeProduct = () => {
    dispatch(removeProductFromCart(product["_id"]));
  };

  const counterIncrement = () => {
    dispatch(counterIncrementProduct(product["_id"]));
  };

  const counterDecrement = () => {
    dispatch(counterDecrementProduct(product["_id"]));
  };

  if ("name" in product) {
    return (
      <>
        <div className={cartItemStyles.card}>
          <div className={cartItemStyles.checkbox}>
            {product.available && (
              <input
                type="checkbox"
                onChange={productIsChecked}
                checked={productCart.isChecked}
              />
            )}
          </div>
          <div className={cartItemStyles.cardImg}>
            <Link to={`/products/${product["_id"]}`}>
              <img src={product.pictures} alt={product.name} />
            </Link>
          </div>
          <div className={cartItemStyles.cardBody}>
            <div className={cartItemStyles.containerInfo}>
              <p className={cartItemStyles.name}>{product.name}</p>
              <p className={cartItemStyles.wight}>{product.wight}</p>
            </div>
            <div className={cartItemStyles.containerCounter}>
              {product.available && (
                <div className={cartItemStyles.counter}>
                  <Button
                    disabled={productCart.count === 1}
                    type="button"
                    onClick={counterDecrement}
                  >
                    -
                  </Button>
                  <span>{productCart.count}</span>
                  <Button
                    disabled={productCart.count === product.stock}
                    type="button"
                    onClick={counterIncrement}
                  >
                    +
                  </Button>
                </div>
              )}
              <p
                className={cartItemStyles.remove}
                role="presentation"
                onClick={removeProduct}
              >
                Удалить
              </p>
            </div>
            <div className={cartItemStyles.containerPrice}>
              {product.available ? (
                <>
                  <h3>{priceWithDiscount * productCart.count} ₽</h3>
                  {!!product.discount && (
                    <span>{product.price * productCart.count} ₽</span>
                  )}
                </>
              ) : (
                <h4>Нет в наличии</h4>
              )}
            </div>
          </div>
        </div>
        <hr />
      </>
    );
  }

  return (
    <>
      <div className={cartItemStyles.card}>
        <div className={cartItemStyles.checkbox} />
        <div className={cartItemStyles.cardImg}>
          <img src="https://cdn-icons-png.flaticon.com/512/4812/4812459.png" alt="Фото продукта" />
        </div>
        <div className={cartItemStyles.cardBody}>
          <div className={cartItemStyles.containerInfo}>
            <h3>Товар удален</h3>
            <p
              className={cartItemStyles.remove}
              role="presentation"
              onClick={removeProduct}
            >
              Удалить
            </p>
          </div>
          <div className={cartItemStyles.containerCounter} />
          <div className={cartItemStyles.containerPrice} />
        </div>
      </div>
      <hr />
    </>
  );
}
