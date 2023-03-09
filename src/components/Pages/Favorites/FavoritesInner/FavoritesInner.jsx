import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { clearFavorites, getFavoritesSelector } from "../../../../redux/slices/favoritesSlice";
import { FavoritesItem } from "../../../FavoriteItem/FavoriteItem";
import { withQuery } from "../../../HOC/withQuery";
import { UniversalPage } from "../../UniversalPage/UniversalPage";
import styles from "./Favorites.module.css";
import cartStyles from "../../Cart/CartInner/Cart.module.css";
import { Button } from "../../../Button/Button";

export const FavoritesInner = withQuery(({ data }) => {
  const dispatch = useDispatch();
  const favorites = useSelector(getFavoritesSelector);

  const clearFavoritesHandler = () => {
    dispatch(clearFavorites());
  };

  const jsxFavoritesEmpty = () => (
    <section className={cartStyles.dogFoodCartEmpty}>
      <h3>В избранном пока пусто</h3>
      <div className={cartStyles.sectionLinks}>
        <Link to="/"><Button type="button">На главную</Button></Link>
        <Link to="/products"><Button type="button">В каталог</Button></Link>
      </div>
    </section>
  );

  const jsxFavoritesNotEmpty = () => (
    <section className={styles.favorites}>
      <div className={styles.titleFav}>
        <h3>Избранное</h3>
        <p
          className={styles.clearFav}
          role="presentation"
          onClick={clearFavoritesHandler}
        >
          Очистить избранное
        </p>
      </div>
      <div className={styles.listFav}>
        {data.map((product) => (
          <FavoritesItem product={product} key={product['_id']} />
        ))}
      </div>
    </section>
  );

  return (
    <UniversalPage>
      {!favorites.length ? jsxFavoritesEmpty() : jsxFavoritesNotEmpty()}
    </UniversalPage>

  );
});
