import { Link } from "react-router-dom";
import styles from "./UserProductItem.module.css";

export function UserProductItem({
  pictures, name, price, wight, discount, id
}) {
  const priceWithDiscount = Math.round(price * (1 - discount * 0.01));
  return (
    <>
      <div className={styles.card}>
        <div className={styles.cardImg}>
          <Link to={`/products/${id}`}>
            <img src={pictures} alt={name} />
          </Link>
        </div>
        <div className={styles.cardBody}>
          <div className={styles.containerInfo}>
            <p className={styles.name}>{name}</p>
            <p className={styles.wight}>{wight}</p>
          </div>
          <div className={styles.containerPrice}>
            <h3>{priceWithDiscount} ₽</h3>
            {!!discount && (<span>{price} ₽</span>)}
          </div>
        </div>
      </div>
      <hr />
    </>
  );
}
