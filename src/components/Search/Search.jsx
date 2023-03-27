import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDebounce } from "../../hooks/useDebounce";
import { changeSearchFilter, clearSearchFilter } from "../../redux/slices/filterSlice";
import searchStyles from "./Search.module.css";

export function Search() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const searchValueFromQuery = searchParams.get('q');

  const [searchValue, setSearchValue] = useState(() =>
    searchValueFromQuery ?? ''
  );
  const debouncedSearchValue = useDebounce(searchValue, 600);

  const changeSearchHandler = (event) => {
    const searchString = event.target.value;
    setSearchValue(searchString);
    setSearchParams({
      ...Object.fromEntries(searchParams.entries()),
      q: searchString
    });
  };

  const focusSearchHandler = () => {
    let queryStr = '/products?';
    const queryArr = Object.entries(Object.fromEntries(searchParams.entries()));
    queryArr.forEach((arr) => {
      queryStr += `${arr[0]}=${arr[1]}&`;
      return queryStr;
    });
    navigate(queryStr);
  };

  useEffect(() => {
    dispatch(changeSearchFilter(debouncedSearchValue));
  }, [debouncedSearchValue, dispatch]);

  useEffect(() => {
    if (!searchValueFromQuery) {
      dispatch(clearSearchFilter());
    }
  }, [searchValueFromQuery]);

  return (
    <input
      type="text"
      value={searchValueFromQuery ?? ''}
      placeholder="Поиск"
      onInput={changeSearchHandler}
      onFocus={focusSearchHandler}
      className={searchStyles.search}
    />
  );
}
