import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { changeSearchFilter } from "../../redux/slices/filterSlice";
import searchStyles from "./Search.module.css";

export function Search() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');

  const changeSearchHandler = (event) => {
    navigate("/products");
    const searchValue = event.target.value;
    setSearch(searchValue);
    dispatch(changeSearchFilter(searchValue));
  };

  return (
    <div className={searchStyles.search}>
      <input
        type="text"
        value={search}
        placeholder="Поиск"
        onInput={changeSearchHandler}
      />
    </div>
  );
}
