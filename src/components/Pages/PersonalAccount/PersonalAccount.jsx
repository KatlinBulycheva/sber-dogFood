import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../../context/DogFoodContextProvider";

export function PersonalAccount() {
  const { setToken } = useContext(AppContext);
  const navigate = useNavigate();

  function handlerExit() {
    setToken('');
    navigate('/');
  }
  return (
    <div>
      Личный кабинет
      <button type="button" onClick={handlerExit}>
        Выйти
      </button>
    </div>
  );
}
