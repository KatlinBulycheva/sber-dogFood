import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Field, Form, Formik } from "formik";
import { useState } from "react";
import { getUserSelector, setTokenUser } from "../../../redux/slices/userSlice";
import { Button } from "../../Button/Button";
import { UniversalPage } from "../UniversalPage/UniversalPage";
import styles from "./Profile.module.css";
import { Modal } from "../../Modal/Modal";

export function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector(getUserSelector);

  const [isExitModalOpen, setIsExitModalOpen] = useState(false);

  const closeExitModalHandler = () => {
    setIsExitModalOpen(false);
  };

  const openExitModalHandler = () => {
    setIsExitModalOpen(true);
  };

  function handlerExit() {
    dispatch(setTokenUser(""));
    navigate("/");
  }

  const initialValuesProfile = {
    name: `${userData.name}`,
    about: `${userData.about}`,
    avatar: `${userData.avatar}`,
    email: `${userData.email}`,
  };

  return (
    <UniversalPage>
      <section className={styles.myData}>
        <Formik initialValues={initialValuesProfile}>
          <Form className={styles.form}>
            <h3 className={styles.title}>Редактирование профиля</h3>

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
                  <Field
                    name="name"
                    type="text"
                    className={styles.input}
                  />
                </div>

                <div>
                  <label htmlFor="about" className={styles.label}>
                    Обо мне
                  </label>
                  <Field
                    name="about"
                    type="text"
                    className={styles.input}
                  />
                </div>

                <div>
                  <label htmlFor="avatar" className={styles.label}>
                    Фото
                  </label>
                  <Field
                    name="avatar"
                    type="text"
                    className={styles.input}
                  />
                </div>

                <div>
                  <label htmlFor="email" className={styles.label}>
                    Эл. почта
                  </label>
                  <Field
                    name="email"
                    type="text"
                    className={styles.input}
                  />
                </div>
              </div>
            </div>
          </Form>
        </Formik>
      </section>

      <section className={styles.myProduct}>
        <h3>Мои товары</h3>
        <Button type="button">Добавить товар</Button>
      </section>

      <Modal isOpen={isExitModalOpen} closeHandler={closeExitModalHandler}>
        <h4 className={styles.modalTitle}>Вы точно хотите выйти?</h4>
        <div className={styles.containerButton}>
          <Button
            type="button"
            onClick={closeExitModalHandler}
          >
            Отмена
          </Button>
          <Button
            type="button"
            onClick={() => handlerExit()}
          >
            Выйти
          </Button>
        </div>

      </Modal>
    </UniversalPage>
  );
}
