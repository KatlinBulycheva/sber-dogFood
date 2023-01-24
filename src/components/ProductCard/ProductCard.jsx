import productCardStyles from "./ProductCard.module.css";

export function ProductCard() {
  return (
    <div className={productCardStyles.card}>
      <div className={productCardStyles.cardImg}>
        <img
          // eslint-disable-next-line max-len
          src="https://avatars.mds.yandex.net/i?id=56306215539a839cb468aa6f9a7ba967f92ad60f-5233158-images-thumbs&n=13"
          alt="img"
        />
      </div>
      <div className={productCardStyles.cardBody}>
        <h5>Price</h5>
        <p>Volume</p>
        <p>Title</p>
      </div>
    </div>
  );
}
