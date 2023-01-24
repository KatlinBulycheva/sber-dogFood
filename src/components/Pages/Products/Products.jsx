import { useQuery } from "@tanstack/react-query";
import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../../context/DogFoodContextProvider";
import { ProductCard } from "../../ProductCard/ProductCard";
import productsStyles from "./Products.module.css";

export function Products() {
  const navigate = useNavigate();
  const { token } = useContext(AppContext);

  useEffect(() => {
    if (!token) {
      navigate("/signin");
    }
  }, [token]);

  const {
    data: products,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["AllProductsFetch", token],
    queryFn: () =>
      fetch("https://api.react-learning.ru/products", {
        headers: {
          authorization: `Bearer ${token}`
        },
      }).then((res) => {
        res.json();
      }),
  });

  console.log({
    token, products, isLoading, isError, error
  });

  return (
    <>
      <h1>Page products</h1>
      <div className={productsStyles.productsContainer}>
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </div>
    </>
  );
}
