import { Link } from "react-router-dom";
import { UniversalPage } from "../UniversalPage/UniversalPage";
import homeStyles from "./Home.module.css";
import dogImg from "./dog_img.jpg";
import { Button } from "../../Button/Button";

export function Home() {
  return (
    <UniversalPage>
      <section className={homeStyles.contentHome}>
        <div className={homeStyles.containerGreeting}>
          <img src={dogImg} alt="greeting" />
          <p className={homeStyles.textGreeting}>
            Вкусное и полезное лакомство для вашего питомца
            <Link to="/products">
              <Button className={homeStyles.button} type="button">
                здесь!
              </Button>
            </Link>
          </p>
        </div>
      </section>
    </UniversalPage>
  );
}
