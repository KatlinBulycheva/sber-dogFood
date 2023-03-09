import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { withQuery } from "../../../HOC/withQuery";
import { UniversalPage } from "../../UniversalPage/UniversalPage";
import styles from "./ProductDetailInner.module.css";
import productCardStyles from "../../../ProductCard/ProductCard.module.css";
import { Button } from "../../../Button/Button";
import {
  addProductToFavorites,
  getFavoritesSelector,
  removeProductFromFavorites,
} from "../../../../redux/slices/favoritesSlice";
import {
  addProductToCart,
  getCartSelector,
  removeProductFromCart,
} from "../../../../redux/slices/cartSlice";
// import { ReviewsItem } from "../../../ReviewsItem/ReviewsItem";
import { NewReviewModal } from "../../../Modals/NewReviewModal/NewReviewModal";
import { EditProductModal } from "../../../Modals/EditProductModal/EditProductModal";
import { DeleteProductModal } from "../../../Modals/DeleteProductModal/DeleteProductModal";
import { getUserSelector } from "../../../../redux/slices/userSlice";
import { getRating } from "../../../../utils/functions";
import { ReviewsList } from "../../../ReviewsList/ReviewsList";

export const ProductDetailInner = withQuery(({ product }) => {
  const dispatch = useDispatch();

  const user = useSelector(getUserSelector);
  const isUserProduct = user.email === product.author.email;

  const [isNewReviewModalOpen, setIsNewReviewModalOpen] = useState(false);
  const [isEditProductModalOpen, setIsEditProductModalOpen] = useState(false);
  const [isDeleteProductModalOpen, setIsDeleteProductModalOpen] = useState(false);

  const openNewReviewModalHandler = () => {
    setIsNewReviewModalOpen(true);
  };

  const openEditProductModalHandler = () => {
    setIsEditProductModalOpen(true);
  };

  const openDeleteProductModalHandler = () => {
    setIsDeleteProductModalOpen(true);
  };

  const cart = useSelector(getCartSelector);
  const productWithActiveCart = cart.find(
    (cartProduct) => cartProduct.id === product["_id"]
  );

  const favorites = useSelector(getFavoritesSelector);
  const productWithActiveLike = favorites.find(
    (productId) => productId === product["_id"]
  );

  const cartOfProductHandler = (e) => {
    e.preventDefault();
    if (productWithActiveCart) dispatch(removeProductFromCart(product["_id"]));
    else dispatch(addProductToCart(product["_id"]));
  };

  const likeOfProductHandler = (e) => {
    e.preventDefault();
    if (productWithActiveLike) {
      dispatch(removeProductFromFavorites(product["_id"]));
    } else dispatch(addProductToFavorites(product["_id"]));
  };

  return (
    <UniversalPage>
      <article className={styles.containerMain}>
        <section className={styles.containerLeft}>
          <div className={styles.containerImage}>
            <img src={product.pictures} alt={product.name} />
            {!isUserProduct && (
            <span
              onClick={likeOfProductHandler}
              title={
                productWithActiveLike
                  ? "Удалить из избранного"
                  : "Добавить в избранное"
              }
            >
              {!!productWithActiveLike && (
                <i
                  className={classNames("fa-solid fa-heart", {
                    [styles.isActiveLike]: !!productWithActiveLike,
                  })}
                />
              )}
              {!productWithActiveLike && (
                <i
                  className={classNames("fa-regular fa-heart", {
                    [styles.isNoActiveLike]: !productWithActiveLike,
                  })}
                />
              )}
            </span>
            )}
            <div className={styles.offers}>
              {!!product.discount && (
                <span className={productCardStyles.discount}>
                  -{product.discount}%
                </span>
              )}
              {product.tags.includes("new") && (
                <span className={productCardStyles.new}>Новинка</span>
              )}
            </div>
          </div>
          <div className={styles.containerInfo}>
            <h3>{product.name}</h3>
            <p className={styles.containerStar}>
              <i
                className={classNames(
                  "fa-solid fa-star",
                  { [styles.isActiveStar]: !!product.reviews.length },
                  { [styles.isNoActiveStar]: !product.reviews.length }
                )}
              />
              <span className={styles.stars}>
                {product.reviews.length ? `   ${getRating(product.reviews)}` : "   Нет оценок"}
              </span>
              <span className={styles.countReviews}>
                {product.reviews.length
                  ? `Отзывов ${product.reviews.length}`
                  : ""}
              </span>
            </p>
            <p className={styles.containerItemInfo}>
              <span>Вес:</span>
              <span>{product.wight}</span>
            </p>
            <p className={styles.containerItemInfo}>
              <span>Описание:</span>
              <span>{product.description}</span>
            </p>
          </div>
          <div className={styles.containerReviews}>
            <h3>Отзывы</h3>
            {!isUserProduct && (
              <div className={styles.filters}>
                <Button type="button" onClick={openNewReviewModalHandler}>
                  Добавить отзыв
                </Button>
              </div>
            )}
            {!product.reviews.length && <span>Отзывов пока нет</span>}
            <ReviewsList productId={product["_id"]} />
          </div>
        </section>
        <section className={styles.containerRight}>
          {product.available && (
            <>
              <h3>
                {`${Math.round(
                  product.price * (1 - product.discount * 0.01)
                )} ₽   `}
                {!!product.discount && (
                  <span className={productCardStyles.oldPrice}>
                    {product.price} ₽
                  </span>
                )}
              </h3>
              {isUserProduct && (
                <>
                  <Button type="button" onClick={openEditProductModalHandler}>
                    Изменить
                  </Button>
                  <Button type="button" onClick={openDeleteProductModalHandler}>
                    Удалить
                  </Button>
                </>
              )}
              {!isUserProduct && (
                <>
                  <Button type="button" onClick={cartOfProductHandler}>
                    {productWithActiveCart
                      ? "Удалить из корзины"
                      : "Добавить в корзину"}
                  </Button>
                  <Button type="submit">Купить сейчас</Button>
                </>
              )}
            </>
          )}
          {!product.available && (
            <>
              <h3>Нет в наличии</h3>
              {isUserProduct && (
                <>
                  <Button type="button" onClick={openEditProductModalHandler}>
                    Изменить
                  </Button>
                  <Button type="button" onClick={openDeleteProductModalHandler}>
                    Удалить
                  </Button>
                </>
              )}
              {!isUserProduct && <Button type="button">Найти похожие</Button>}
            </>
          )}
        </section>
      </article>
      <NewReviewModal
        isNewReviewModalOpen={isNewReviewModalOpen}
        setIsNewReviewModalOpen={setIsNewReviewModalOpen}
        id={product["_id"]}
        name={product.name}
      />
      <EditProductModal
        isEditProductModalOpen={isEditProductModalOpen}
        setIsEditProductModalOpen={setIsEditProductModalOpen}
        product={product}
      />
      <DeleteProductModal
        isDeleteProductModalOpen={isDeleteProductModalOpen}
        setIsDeleteProductModalOpen={setIsDeleteProductModalOpen}
        product={product}
      />
    </UniversalPage>
  );
});
