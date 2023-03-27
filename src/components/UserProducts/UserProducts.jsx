import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { dogFoodApi } from "../../api/DogFoodApi";
import {
  getTokenSelector,
  getUserSelector,
} from "../../redux/slices/userSlice";
import { getQueryKeySearch } from "../../utils/functions";
import { UserProductsInner } from "./UserProductsInner/UserProductsInner";

export function UserProducts() {
  const token = useSelector(getTokenSelector);
  const userData = useSelector(getUserSelector);

  const {
    data, isLoading, isError, error, refetch
  } = useQuery({
    queryKey: getQueryKeySearch(""),
    queryFn: () => dogFoodApi.getAllProducts("", token),
  });

  const userProducts = data
    && data.filter((product) => product.author.email === userData.email).reverse();

  return (
    <UserProductsInner
      data={userProducts}
      isLoading={isLoading}
      isError={isError}
      error={error}
      refetch={refetch}
    />
  );
}
