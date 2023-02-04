import { Link } from "react-router-dom";
import { Filter } from "../../Filter/Filter";
import { UniversalPage } from "../UniversalPage/UniversalPage";
import homeStyles from "./Home.module.css";

export function Home() {
  return (
    <UniversalPage>
      <section className={homeStyles.contentHome}>
        <Link to="/products">
          <Filter>
            Продукты
          </Filter>
        </Link>

        <h1>Магазин продуктов для собак</h1>
      </section>
    </UniversalPage>

  );
}
