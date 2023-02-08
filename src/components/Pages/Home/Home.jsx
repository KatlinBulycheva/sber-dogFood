import { Link } from "react-router-dom";
import { Filter } from "../../Filter/Filter";
import { UniversalPage } from "../UniversalPage/UniversalPage";
import homeStyles from "./Home.module.css";
import dogImg from "./dog_img.jpg";

export function Home() {
  return (
    <UniversalPage>
      <section className={homeStyles.contentHome}>
        <Link to="/products">
          <Filter>Продукты</Filter>
        </Link>

        <div className={homeStyles.containerGreeting}>
          <img src={dogImg} alt="greeting" />
          <p className={homeStyles.textGreeting}>
            Вкусное и полезное лакомство для вашего питомца - здесь!
          </p>
        </div>
      </section>
    </UniversalPage>
  );
}
