import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Field, Form, Formik } from "formik";
import { getUserSelector, setTokenUser } from "../../../redux/slices/userSlice";
import { Button } from "../../Button/Button";
import { UniversalPage } from "../UniversalPage/UniversalPage";
import profileStyles from "./Profile.module.css";

export function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector(getUserSelector);

  function handlerExit() {
    dispatch(setTokenUser(''));
    navigate('/');
  }

  const initialValuesProfile = {
    name: `${userData.name}`,
    about: `${userData.about}`,
    avatar: `${userData.avatar}`,
    email: `${userData.email}`
  };

  return (
    <UniversalPage>
      <Formik initialValues={initialValuesProfile}>
        <Form className={profileStyles.form}>
          <h3 className={profileStyles.title}>Редактирование профиля</h3>

          <div className={profileStyles.prifile}>
            <div className={profileStyles.leftContainer}>

              <div className={profileStyles.avatarContainer}>
                <img src={userData.avatar} alt="avatar" />
              </div>
              <Button type="submit">Сохранить</Button>
              <Button type="button" onClick={() => handlerExit()}>Выйти</Button>

            </div>

            <div className={profileStyles.rightContainer}>

              <div>
                <label htmlFor="name" className={profileStyles.label}>Имя</label>
                <Field
                  name="name"
                  type="text"
                  className={profileStyles.input}
                />
              </div>

              <div>
                <label htmlFor="about" className={profileStyles.label}>Призвание</label>
                <Field
                  name="about"
                  type="text"
                  className={profileStyles.input}
                />
              </div>

              <div>
                <label htmlFor="avatar" className={profileStyles.label}>Фото</label>
                <Field
                  name="avatar"
                  type="text"
                  className={profileStyles.input}
                />
              </div>

              <div>
                <label htmlFor="email" className={profileStyles.label}>Эл. почта</label>
                <Field
                  name="email"
                  type="text"
                  className={profileStyles.input}
                />
              </div>

            </div>
          </div>

        </Form>
      </Formik>
    </UniversalPage>
  );
}
