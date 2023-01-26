import productCardStyles from "./ProductCard.module.css";

export function ProductCard({
  pictures, name, price, wight
}) {
  return (
    <div className={productCardStyles.card}>
      <div className={productCardStyles.cardImg}>
        <img
          // eslint-disable-next-line max-len
          src={pictures}
          alt={name}
        />
      </div>
      <div className={productCardStyles.cardBody}>
        <h3>{`${price} ₽`}</h3>
        <p className={productCardStyles.wight}>{wight}</p>
        <p className={productCardStyles.name}>{name}</p>
      </div>
    </div>
  );
}
