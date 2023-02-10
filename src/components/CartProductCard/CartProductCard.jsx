import { useDispatch, useSelector } from "react-redux";
import {
  counterDecrementProduct,
  counterIncrementProduct,
  getCartSelector,
  removeProductFromCart,
} from "../../redux/slices/cartSlice";
import { Button } from "../Button/Button";
import cartProductStyles from "./CartProductCard.module.css";

export function CartProductCard({
  pictures, name, price, wight, id, stock
}) {
  const dispatch = useDispatch();
  const cart = useSelector(getCartSelector);
  const { count } = cart.find((productItem) => productItem.id === id);

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
      <input type="checkbox" />
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
            <Button disabled={count === 0} type="button" onClick={counterDecrement}>
              -
            </Button>
            <span>{count}</span>
            <Button disabled={count === stock} type="button" onClick={counterIncrement}>
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
          <h3>{`${price * count} ₽`}</h3>
        </div>
      </div>
    </div>
  );
}
