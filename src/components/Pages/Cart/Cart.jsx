import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { dogFoodApi } from "../../../api/DogFoodApi";
import { getCartSelector } from "../../../redux/slices/cartSlice";
import { getTokenSelector } from "../../../redux/slices/userSlice";
import { getQueryKeyCart } from "../../../utils/functions";
import { CartInner } from "./CartInner/CartInner";

export function Cart() {
  const navigate = useNavigate();
  const token = useSelector(getTokenSelector);
  const cart = useSelector(getCartSelector);
  const ids = cart.map((product) => product.id);

  useEffect(() => {
    if (!token) {
      navigate("/signin");
    }
  }, [token]);

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
