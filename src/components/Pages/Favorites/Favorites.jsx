import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getFavoritesSelector } from "../../../redux/slices/favoritesSlice";
import { getTokenSelector } from "../../../redux/slices/userSlice";
import { FavoritesInner } from "./FavoritesInner/FavoritesInner";
import { dogFoodApi } from "../../../api/DogFoodApi";
import { getQueryKeyFavorites } from "../../../utils/functions";

export function Favorites() {
  const navigate = useNavigate();
  const token = useSelector(getTokenSelector);
  const favorites = useSelector(getFavoritesSelector);
  const ids = favorites;

  useEffect(() => {
    if (!token) {
      navigate("/signin");
    }
  }, [token]);

  const {
    data, isLoading, isError, error, refetch
  } = useQuery({
    queryKey: getQueryKeyFavorites(ids),
    queryFn: () => dogFoodApi.getProductsByIds(ids, token),
  });

  return (
    <FavoritesInner
      data={data}
      isLoading={isLoading}
      isError={isError}
      error={error}
      refetch={refetch}
    />
  );
}
