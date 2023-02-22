import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUserSelector, setTokenUser } from "../../../redux/slices/userSlice";
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
  return (
    <UniversalPage>
      <section className={profileStyles.form}>
        <h3 className={profileStyles.title}>Редактирование профиля</h3>

        <div className={profileStyles.prifile}>
          <div className={profileStyles.leftContainer}>

            <div className={profileStyles.avatarContainer}>
              <img src={userData.avatar} alt="avatar" />
            </div>
            <button type="submit">Сохранить</button>
            <button type="button" onClick={handlerExit}>Выйти</button>

          </div>

          <div className={profileStyles.rightContainer}>
            <div>
              <input className={profileStyles.input} defaultValue={userData.name} />
            </div>
            <div>
              <input className={profileStyles.input} defaultValue={userData.about} />
            </div>
            <div>
              <input className={profileStyles.input} defaultValue={userData.avatar} />
            </div>
            <div>
              <input className={profileStyles.input} defaultValue={userData.email} />
            </div>
          </div>
        </div>

      </section>
    </UniversalPage>
  );
}
