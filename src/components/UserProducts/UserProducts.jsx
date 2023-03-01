import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { dogFoodApi } from "../../api/DogFoodApi";
import { getProductsIdsSelector, getTokenSelector } from "../../redux/slices/userSlice";
import { getQueryKeyProductsUser } from "../../utils/functions";
import { UserProductsInner } from "./UserProductsInner/UserProductsInner";

export function UserProducts() {
  const token = useSelector(getTokenSelector);
  const ids = useSelector(getProductsIdsSelector);

  const {
    data, isLoading, isError, error, refetch
  } = useQuery({
    queryKey: getQueryKeyProductsUser(ids),
    queryFn: () => dogFoodApi.getProductsByIds(ids, token),
  });

  return (
    <UserProductsInner
      data={data}
      isLoading={isLoading}
      isError={isError}
      error={error}
      refetch={refetch}
    />
  );
}
