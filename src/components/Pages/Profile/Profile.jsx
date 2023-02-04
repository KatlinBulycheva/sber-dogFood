import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../../context/DogFoodContextProvider";
import { UniversalPage } from "../UniversalPage/UniversalPage";
import profileStyles from "./Profile.module.css";

export function Profile() {
  const { setToken } = useContext(AppContext);
  const navigate = useNavigate();

  function handlerExit() {
    setToken('');
    navigate('/');
  }
  return (
    <UniversalPage>
      <section className={profileStyles.form}>
        <h3 className={profileStyles.title}>Редактирование профиля</h3>

        <div className={profileStyles.prifile}>
          <div className={profileStyles.leftContainer}>

            <div className={profileStyles.avatarContainer}>avatarImg</div>
            <button type="submit">Сохранить</button>
            <button type="button" onClick={handlerExit}>Выйти</button>

          </div>

          <div className={profileStyles.rightContainer}>
            <div><input className={profileStyles.input} defaultValue="name" /></div>
            <div><input className={profileStyles.input} defaultValue="avatar" /></div>
            <div><input className={profileStyles.input} defaultValue="about" /></div>
            <div><input className={profileStyles.input} defaultValue="email" /></div>
            <div><input className={profileStyles.input} defaultValue="group" /></div>
          </div>
        </div>

      </section>
    </UniversalPage>
  );
}
