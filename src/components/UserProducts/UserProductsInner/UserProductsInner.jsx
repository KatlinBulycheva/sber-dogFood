import { useState } from "react";
import { Button } from "../../Button/Button";
import { withQuery } from "../../HOC/withQuery";
import { NewProductModal } from "../../Modals/NewProductModal/NewProductModal";
import { UserProductItem } from "../../UserProductItem/UserProductItem";
import styles from "./UserProductsInner.module.css";

export const UserProductsInner = withQuery(({ data }) => {
  const [isNewProductModalOpen, setIsNewProductModalOpen] = useState(false);

  const openNewProductModalHandler = () => {
    setIsNewProductModalOpen(true);
  };

  const jsxUserProductsEmpty = () => (
    <div className={styles.userProductsEmpty}>
      <h3>Здесь пока пусто.<br /> Хотите добавить свой товар?</h3>
      <Button type="button" onClick={openNewProductModalHandler}>
        Добавить товар
      </Button>
    </div>
  );

  const jsxCartNotEmpty = () => (
    <div className={styles.userProductsWr}>
      <div className={styles.listProducts}>
        {data.map(({ _id: id, ...product }) => (
          <UserProductItem {...product} id={id} key={id} />
        ))}
      </div>
      <div className={styles.windowResult}>
        <Button type="button" onClick={openNewProductModalHandler}>
          Добавить товар
        </Button>
        <div className={styles.localContainer}>
          <h4>Создано товаров {data.length}</h4>
        </div>
      </div>

      <NewProductModal
        isNewProductModalOpen={isNewProductModalOpen}
        setIsNewProductModalOpen={setIsNewProductModalOpen}
      />
    </div>
  );

  return (
    <section>
      {!data.length ? jsxUserProductsEmpty() : jsxCartNotEmpty()}
    </section>
  );
});
