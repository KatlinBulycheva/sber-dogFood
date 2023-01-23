import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../../context/DogFoodContextProvider";

export function Products() {
  const navigate = useNavigate();
  const { token } = useContext(AppContext);

  useEffect(() => {
    if (!token) {
      navigate('/signin');
    }
  }, []);

  return <h1>Page products</h1>;
}
