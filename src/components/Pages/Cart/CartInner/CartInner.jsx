import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  checkAllProducts, clearCart, getCartSelector, uncheckAllProducts
} from "../../../../redux/slices/cartSlice";
import { Button } from "../../../Button/Button";
import { CartItem } from "../../../CartItem/CartItem";
import { withQuery } from "../../../HOC/withQuery";
import { UniversalPage } from "../../UniversalPage/UniversalPage";
import cartStyles from "./Cart.module.css";

export const CartInner = withQuery(({ data }) => {
  const cart = useSelector(getCartSelector);
  const dispatch = useDispatch();
  let finalPriceCart = 0;
  let finalCountCart = 0;
  let finalDiscountCart = 0;
  let finalPriceWithoutDiscount = 0;

  const clearCartHandler = () => {
    dispatch(clearCart());
  };

  const checkedProductsFull = cart
    .map((product, i) => ({ ...product, ...data[i] }))
    .filter((product) => product.isChecked === true);

  checkedProductsFull.forEach(
    // eslint-disable-next-line no-return-assign
    (product) => {
      const productWithDiscount = Math.round(product.price * (1 - product.discount * 0.01));
      const productDiscount = product.price - productWithDiscount;
      if (product.available) {
        finalPriceCart += productWithDiscount * product.count;
        finalCountCart += product.count;
        finalDiscountCart += productDiscount * product.count;
        finalPriceWithoutDiscount += product.price * product.count;
      }
    }
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
        <hr />
        {data.map((product) => (
          <CartItem product={product} key={product['_id']} />
        ))}
      </section>
      <section className={cartStyles.ordering}>
        {!!finalPriceCart && (
          <>
            <div className={cartStyles.orderingBody}>
              <div>
                <h3>Итого</h3>
                <h3>{finalPriceCart} ₽</h3>
              </div>
              <div>
                <p>Товары, {finalCountCart} шт.</p>
                <p>{finalPriceWithoutDiscount} ₽</p>
              </div>
              {!!finalDiscountCart && (
                <div>
                  <p>Скидка</p>
                  <p>-{finalDiscountCart} ₽</p>
                </div>
              )}
            </div>
            <Button type="submit">Заказать</Button>
          </>
        )}
        {!finalPriceCart && (
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
