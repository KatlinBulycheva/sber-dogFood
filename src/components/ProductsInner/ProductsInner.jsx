import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { dogFoodApi } from "../../api/DogFoodApi";
import { getSearchSelector } from "../../redux/slices/filterSlice";
import { getTokenSelector } from "../../redux/slices/userSlice";
import { getQueryKeySearch, productsSorting } from "../../utils/functions";
import { withQuery } from "../HOC/withQuery";
import { ProductCard } from "../ProductCard/ProductCard";
import productsStyles from "./ProductsInner.module.css";

const ProductCardInner = withQuery(({ data }) => {
  const sortData = productsSorting(data);

  return (
    <div className={productsStyles.productsContainer}>
      {sortData.map(({ _id: id, ...product }) => (
        <ProductCard {...product} id={id} key={id} />
      ))}
      {!data.length && <p>По вашему запросу товары не найдены</p>}
    </div>
  );
});

export function ProductsInner() {
  const navigate = useNavigate();
  const token = useSelector(getTokenSelector);
  const searchValue = useSelector(getSearchSelector);

  useEffect(() => {
    if (!token) {
      navigate("/signin");
    }
  }, [token]);

  const {
    data, isLoading, isError, error, refetch
  } = useQuery({
    queryKey: getQueryKeySearch(searchValue),
    queryFn: () => dogFoodApi.getAllProducts(searchValue, token),
    enabled: !!token
  });

  return (
    <ProductCardInner
      data={data}
      isLoading={isLoading}
      isError={isError}
      error={error}
      refetch={refetch}
    />
  );
}
