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

export function CartItem({
  pictures, name, price, wight, id, stock, discount, available
}) {
  const dispatch = useDispatch();
  const cart = useSelector(getCartSelector);
  const product = cart.find((productItem) => productItem.id === id);
  const priceWithDiscount = Math.round(price * (1 - discount * 0.01));

  const productIsChecked = () => {
    if (!product.isChecked) dispatch(setChecked(id));
    else dispatch(setUnChecked(id));
  };

  const removeProduct = () => {
    dispatch(removeProductFromCart(id));
  };

  const counterIncrement = () => {
    dispatch(counterIncrementProduct(id));
  };

  const counterDecrement = () => {
    dispatch(counterDecrementProduct(id));
  };

  return (
    <>
      <div className={cartItemStyles.card}>
        <div className={cartItemStyles.checkbox}>
          {available && (
          <input
            type="checkbox"
            onChange={productIsChecked}
            checked={product.isChecked}
          />
          )}
        </div>
        <div className={cartItemStyles.cardImg}>
          <Link to={`/products/${id}`}>
            <img src={pictures} alt={name} />
          </Link>
        </div>
        <div className={cartItemStyles.cardBody}>
          <div className={cartItemStyles.containerInfo}>
            <p className={cartItemStyles.name}>{name}</p>
            <p className={cartItemStyles.wight}>{wight}</p>
          </div>
          <div className={cartItemStyles.containerCounter}>
            {available && (
              <div className={cartItemStyles.counter}>
                <Button
                  disabled={product.count === 1}
                  type="button"
                  onClick={counterDecrement}
                >
                  -
                </Button>
                <span>{product.count}</span>
                <Button
                  disabled={product.count === stock}
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
            {available ? (
              <>
                <h3>{priceWithDiscount * product.count} ₽</h3>
                {!!discount && (<span>{price * product.count} ₽</span>)}
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
