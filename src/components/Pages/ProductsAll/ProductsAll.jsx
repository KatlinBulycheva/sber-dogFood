import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getFilterSelector } from "../../../redux/slices/filterSlice";
import { getTokenSelector } from "../../../redux/slices/userSlice";
import { getQueryKeySearch } from "../../../utils/functions";
import { withQuery } from "../../HOC/withQuery";
import { ProductCard } from "../../ProductCard/ProductCard";
import productsStyles from "../Products/Products.module.css";

const ProductCardInner = withQuery(({ data, searchValue }) => {
  if (searchValue) {
    return (
      <div className={productsStyles.productsContainer}>
        {data.map(({ _id: id, ...product }) => (
          <ProductCard {...product} id={id} key={id} />
        ))}
      </div>
    );
  } return (
    <div className={productsStyles.productsContainer}>
      {data.products.map(({ _id: id, ...product }) => (
        <ProductCard {...product} id={id} key={id} />
      ))}
    </div>
  );
});

export function ProductsAll() {
  const navigate = useNavigate();
  const token = useSelector(getTokenSelector);
  const searchValue = useSelector(getFilterSelector);

  useEffect(() => {
    if (!token) {
      navigate("/signin");
    }
  }, [token]);

  const getEndPoint = () => {
    if (searchValue) {
      return `https://api.react-learning.ru/products/search?query=${searchValue}`;
    }
    return "https://api.react-learning.ru/products";
  };

  const getIsEnabled = () => {
    if (!!token && !!searchValue) return true;
    return !!token;
  };

  const {
    data, isLoading, isError, error, refetch
  } = useQuery({
    queryKey: getQueryKeySearch(searchValue),
    queryFn: () =>
      fetch(getEndPoint(), {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }).then((res) => res.json()),
    enabled: getIsEnabled()
  });

  return (
    <ProductCardInner
      data={data}
      isLoading={isLoading}
      isError={isError}
      error={error}
      refetch={refetch}
      searchValue={searchValue}
    />
  );
}
