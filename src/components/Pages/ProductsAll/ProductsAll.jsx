import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getTokenSelector } from "../../../redux/slices/userSlice";
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
  const token = useSelector(getTokenSelector);

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
