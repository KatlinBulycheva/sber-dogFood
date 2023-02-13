import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { dogFoodApi } from "../../../api/DogFoodApi";
import { getCartSelector } from "../../../redux/slices/cartSlice";
import { getTokenSelector } from "../../../redux/slices/userSlice";
import { getQueryKeyCart } from "../../../utils/functions";
import { CartInner } from "./CartInner/CartInner";

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
