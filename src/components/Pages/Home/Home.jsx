import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { UniversalPage } from "../UniversalPage/UniversalPage";
import homeStyles from "./Home.module.css";
import dogImg from "./dog_img.jpg";
import { Button } from "../../Button/Button";

export function Home() {
  const [isLoading, setIsLoading] = useState(true);

  const loadImg = (path) => new Promise((resolve, reject) => {
    const img = new Image();
    img.src = path;
    img.onload = () => resolve(img);
    img.onerror = () => reject(path);
  });

  useEffect(() => {
    loadImg(dogImg).then(() => setIsLoading(!isLoading));
  }, []);

  return (
    <UniversalPage>
      <section className={homeStyles.contentHome}>
        <div className={homeStyles.containerGreeting}>
          <img src={dogImg} alt="greeting" />
          {!isLoading && (
          <p className={homeStyles.textGreeting}>
            Вкусное и полезное лакомство для вашего питомца
            <Link to="/products">
              <Button className={homeStyles.button} type="button">
                здесь!
              </Button>
            </Link>
          </p>
          )}
        </div>
      </section>
    </UniversalPage>
  );
}
