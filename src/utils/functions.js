import { useSearchParams } from "react-router-dom";
import {
  FILTER_BENEFIT, FILTER_NEWLY, FILTER_POPULAR, FILTER_PRICEDOWN, FILTER_PRICEUP, FILTER_RATE
} from "./constants";

export const getQueryKeySearch = (searchValue) => ["AllProductsFetch", searchValue];
export const getQueryKeyCart = (ids) => ["CartProductsFetch", ids];
export const getQueryKeyFavorites = (ids) => ["FavoritesProductsFetch", ids];

export const productsSorting = (data) => {
  let sortData;
  const [searchParams] = useSearchParams();

  switch (searchParams.get('filterName')) {
    case FILTER_POPULAR:
      sortData = data.filter((item) => item.reviews.length > 10);
      break;
    case FILTER_NEWLY:
      sortData = data.filter((item) => item.tags.includes('new'));
      break;
    case FILTER_PRICEUP:
      sortData = data.sort((item1, item2) => {
        const priceItem1 = item1.price * (1 - item1.discount * 0.01);
        const priceItem2 = item2.price * (1 - item2.discount * 0.01);
        return priceItem1 - priceItem2;
      });
      break;
    case FILTER_PRICEDOWN:
      sortData = data.sort((item1, item2) => {
        const priceItem1 = item1.price * (1 - item1.discount * 0.01);
        const priceItem2 = item2.price * (1 - item2.discount * 0.01);
        return priceItem2 - priceItem1;
      });
      break;
    case FILTER_RATE:
      sortData = data.sort((item1, item2) => item2.likes.length - item1.likes.length);
      break;
    case FILTER_BENEFIT:
      sortData = data.filter((item) => item.discount > 0);
      break;
    default:
      sortData = data;
  }

  return sortData;
};
