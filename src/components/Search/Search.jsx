import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDebounce } from "../../hooks/useDebounce";
import { changeSearchFilter } from "../../redux/slices/filterSlice";
import searchStyles from "./Search.module.css";

export function Search() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState('');
  // const searchValueStore = useSelector(getFilterSelector);
  const debouncedSearchValue = useDebounce(searchValue, 1000);

  const changeSearchHandler = (event) => {
    navigate("/products");
    setSearchValue(event.target.value);
  };

  useEffect(() => {
    dispatch(changeSearchFilter(debouncedSearchValue));
  }, [debouncedSearchValue, dispatch]);

  return (
    <input
      type="text"
      value={searchValue}
      placeholder="Поиск"
      onInput={changeSearchHandler}
      className={searchStyles.search}
    />
  );
}
