import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { dogFoodApi } from "../../../api/DogFoodApi";
import { getTokenSelector } from "../../../redux/slices/userSlice";
import { getQueryKeyProduct } from "../../../utils/functions";
import { ProductDetailInner } from "./ProductDetailInner/ProductDetailInner";

export function ProductDetail() {
  const { productId } = useParams();
  const token = useSelector(getTokenSelector);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/signin");
    }
  }, [token]);

  const {
    data: product, isLoading, isError, error, refetch
  } = useQuery({
    queryKey: getQueryKeyProduct(productId),
    queryFn: () => dogFoodApi.getProductById(productId, token),
    enabled: !!token
  });

  return (
    <ProductDetailInner
      product={product}
      isLoading={isLoading}
      isError={isError}
      error={error}
      refetch={refetch}
    />
  );
}
