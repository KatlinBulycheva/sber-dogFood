import { Link } from "react-router-dom";
import homeStyles from "./Home.module.css";

export function Home() {
  return (
    <main className={homeStyles.contentHome}>
      <Link to="/products">
        <div
          className={homeStyles.allProducts}
        >
          Продукты
        </div>
      </Link>
      <h1>Магазин продуктов для собак</h1>
    </main>
  );
}
