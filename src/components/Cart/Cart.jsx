import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { dogFoodApi } from "../../api/DogFoodApi";
import { getCartSelector } from "../../redux/slices/cartSlice";
import { getTokenSelector } from "../../redux/slices/userSlice";
import { WrapperStylesForCart } from "../../utils/constants";
import { getQueryKeyCart } from "../../utils/functions";
import { Button } from "../Button/Button";
import { CartProductCard } from "../CartProductCard/CartProductCard";
import { withQuery } from "../HOC/withQuery";
import { UniversalPage } from "../Pages/UniversalPage/UniversalPage";
import cartStyles from "./Cart.module.css";

const CartInner = withQuery(({ data }) => {
  const cart = useSelector(getCartSelector);
  console.log({ cart });
  return (
    <UniversalPage wrStyles={WrapperStylesForCart}>
      <section className={cartStyles.cart}>
        <div className={cartStyles.cartTitle}>
          <h3>Корзина</h3>
          <label htmlFor="checkedAll">
            <input type="checkbox" id="checkedAll" />
            Выбрать все
          </label>
        </div>
        <div className={cartStyles.hr} />
        {data.map(({ _id: id, ...product }) => (
          <CartProductCard {...product} id={id} key={id} />
        ))}
      </section>
      <section className={cartStyles.ordering}>
        <div className={cartStyles.orderingTitle}>
          <h3>Итого</h3>
          <h3>10 000 ₽</h3>
        </div>
        <Button type="submit">Заказать</Button>
      </section>
    </UniversalPage>

  );
});

export function Cart() {
  const token = useSelector(getTokenSelector);
  const cart = useSelector(getCartSelector);
  const ids = cart.map((product) => product.id);

  const {
    data, isLoading, isError, error, refetch
  } = useQuery({
    queryKey: getQueryKeyCart(ids),
    queryFn: () => dogFoodApi.getProductsByIds(ids, token),
  });

  return (
    <CartInner
      data={data}
      isLoading={isLoading}
      isError={isError}
      error={error}
      refetch={refetch}
    />
  );
}
