import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  checkAllProducts, clearCart, getCartSelector, uncheckAllProducts
} from "../../../../redux/slices/cartSlice";
import { Button } from "../../../Button/Button";
import { CartProductCard } from "../../../CartProductCard/CartProductCard";
import { withQuery } from "../../../HOC/withQuery";
import { UniversalPage } from "../../UniversalPage/UniversalPage";
import cartStyles from "./Cart.module.css";

export const CartInner = withQuery(({ data }) => {
  const cart = useSelector(getCartSelector);
  const dispatch = useDispatch();

  const clearCartHandler = () => {
    dispatch(clearCart());
  };

  const checkedProductsFull = cart
    .map((product, i) => ({ ...product, ...data[i] }))
    .filter((product) => product.isChecked === true);

  let finalPrice = 0;
  checkedProductsFull.forEach(
    // eslint-disable-next-line no-return-assign
    (product) => (finalPrice += product.price * product.count)
  );

  const isAllProductCheck = checkedProductsFull.length === cart.length;

  const checkAllProductsHandler = () => {
    if (!isAllProductCheck) dispatch(checkAllProducts());
    else dispatch(uncheckAllProducts());
  };

  const jsxCartEmpty = () => (
    <section className={cartStyles.dogFoodCartEmpty}>
      <h3>Корзина пуста</h3>
      <div className={cartStyles.sectionLinks}>
        <Link to="/"><Button type="button">На главную</Button></Link>
        <Link to="/products"><Button type="button">В каталог</Button></Link>
      </div>
    </section>
  );

  const jsxCartNotEmpty = () => (
    <article className={cartStyles.dogFoodCart}>
      <section className={cartStyles.cart}>
        <div className={cartStyles.cartTitle}>
          <h3>Корзина</h3>
          <div className={cartStyles.handlerAll}>
            <label htmlFor="checkedAll">
              <input
                type="checkbox"
                id="checkedAll"
                checked={isAllProductCheck}
                onChange={checkAllProductsHandler}
              />
              Выбрать все
            </label>
            <p
              className={cartStyles.clearCart}
              role="presentation"
              onClick={clearCartHandler}
            >
              Очистить корзину
            </p>
          </div>
        </div>
        <div className={cartStyles.hr} />
        {data.map(({ _id: id, ...product }) => (
          <CartProductCard {...product} id={id} key={id} />
        ))}
      </section>
      <section className={cartStyles.ordering}>
        {finalPrice ? (
          <>
            <div className={cartStyles.orderingTitle}>
              <h3>Итого</h3>
              <h3>{`${finalPrice} ₽`}</h3>
            </div>
            <Button type="submit">Заказать</Button>
          </>
        ) : (
          <p className={cartStyles.emptyListChecked}>
            Выберите товары для оформления
          </p>
        )}
      </section>
    </article>
  );

  return (
    <UniversalPage>
      {!cart.length ? jsxCartEmpty() : jsxCartNotEmpty()}
    </UniversalPage>
  );
});
