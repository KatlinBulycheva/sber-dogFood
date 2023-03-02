import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { getTokenSelector, getUserSelector, setTokenUser } from "../../../redux/slices/userSlice";
import { Button } from "../../Button/Button";
import { UniversalPage } from "../UniversalPage/UniversalPage";
import styles from "./Profile.module.css";
import { ExitModal } from "../../Modals/ExitModal/ExitModal";
import { UserProducts } from "../../UserProducts/UserProducts";

export function Profile() {
  const token = useSelector(getTokenSelector);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector(getUserSelector);

  useEffect(() => {
    if (!token) {
      navigate("/signin");
    }
  }, [token]);

  const [isExitModalOpen, setIsExitModalOpen] = useState(false);

  const openExitModalHandler = () => {
    setIsExitModalOpen(true);
  };

  const exitHandler = () => {
    dispatch(setTokenUser(""));
    navigate("/");
  };

  const initialValuesProfile = {
    name: `${userData.name}`,
    about: `${userData.about}`,
    avatar: `${userData.avatar}`,
    email: `${userData.email}`,
  };

  return (
    <UniversalPage>
      <article className={styles.containerMain}>
        <section className={styles.myData}>
          <h3>Редактирование профиля</h3>
          <Formik initialValues={initialValuesProfile}>
            <Form className={styles.form}>

              <div className={styles.prifile}>
                <div className={styles.leftContainer}>
                  <div className={styles.avatarContainer}>
                    <img src={userData.avatar} alt="avatar" />
                  </div>
                  <Button type="button" onClick={() => openExitModalHandler()}>
                    Выйти
                  </Button>
                </div>

                <div className={styles.rightContainer}>
                  <div>
                    <label htmlFor="name" className={styles.label}>
                      Имя
                    </label>
                    <Field name="name" type="text" className={styles.input} />
                  </div>

                  <div>
                    <label htmlFor="about" className={styles.label}>
                      Обо мне
                    </label>
                    <Field name="about" type="text" className={styles.input} />
                  </div>

                  <div>
                    <label htmlFor="avatar" className={styles.label}>
                      Фото
                    </label>
                    <Field name="avatar" type="text" className={styles.input} />
                  </div>

                  <div>
                    <label htmlFor="email" className={styles.label}>
                      Эл. почта
                    </label>
                    <Field name="email" type="text" className={styles.input} />
                  </div>
                </div>
              </div>
            </Form>
          </Formik>
        </section>

        <section className={styles.myProducts}>
          <h3>Мои товары</h3>
          <UserProducts />
        </section>
      </article>

      <ExitModal
        isExitModalOpen={isExitModalOpen}
        setIsExitModalOpen={setIsExitModalOpen}
        exitHandler={exitHandler}
      />
    </UniversalPage>
  );
}
