import { useQuery } from "@tanstack/react-query";
import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../../context/DogFoodContextProvider";
import { withQuery } from "../../HOC/withQuery";
import { ProductCard } from "../../ProductCard/ProductCard";
import productsStyles from "../Products/Products.module.css";

const ProductCardInner = withQuery(({ data }) => (

  <div className={productsStyles.productsContainer}>
    {data.products.map(({ _id: id, ...product }) => (
      <ProductCard {...product} id={id} key={id} />
    ))}
  </div>
));

export function ProductsAll() {
  const navigate = useNavigate();
  const { token } = useContext(AppContext);

  useEffect(() => {
    if (!token) {
      navigate("/signin");
    }
  }, [token]);

  const {
    data, isLoading, isError, error, refetch
  } = useQuery({
    queryKey: ["AllProductsFetch", token],
    queryFn: () =>
      fetch("https://api.react-learning.ru/products", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }).then((res) => res.json()),
    enabled: !!token
  });

  console.log({
    token,
    data,
    isLoading,
    isError,
    error,
    refetch,
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
