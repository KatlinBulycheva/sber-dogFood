import { useDispatch, useSelector } from "react-redux";
import {
  counterDecrementProduct,
  counterIncrementProduct,
  getCartSelector,
  removeProductFromCart,
  setChecked,
  setUnChecked,
} from "../../redux/slices/cartSlice";
import { Button } from "../Button/Button";
import cartProductStyles from "./CartProductCard.module.css";

export function CartProductCard({
  pictures, name, price, wight, id, stock
}) {
  const dispatch = useDispatch();
  const cart = useSelector(getCartSelector);
  const product = cart.find((productItem) => productItem.id === id);

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
    <div className={cartProductStyles.card}>
      <input
        type="checkbox"
        onChange={productIsChecked}
        checked={product.isChecked}
      />
      <div className={cartProductStyles.cardImg}>
        <img src={pictures} alt={name} />
      </div>
      <div className={cartProductStyles.cardBody}>
        <div className={cartProductStyles.containerInfo}>
          <p className={cartProductStyles.name}>{name}</p>
          <p className={cartProductStyles.wight}>{wight}</p>
        </div>
        <div className={cartProductStyles.containerCounter}>
          <div className={cartProductStyles.counter}>
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
          <p
            className={cartProductStyles.remove}
            role="presentation"
            onClick={removeProduct}
          >
            Удалить
          </p>
        </div>
        <div className={cartProductStyles.containerPrice}>
          <h3>{`${price * product.count} ₽`}</h3>
        </div>
      </div>
    </div>
  );
}
