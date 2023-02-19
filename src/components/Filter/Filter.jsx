import { useSearchParams } from "react-router-dom";
import { FILTERS } from "../../utils/constants";
import { FilterItem } from "../FilterItem/FilterItem";
import filterStyles from "./Filter.module.css";

export function Filter() {
  const [searchParams, setSearchParams] = useSearchParams();

  const filterItemHandler = (filterName) => {
    setSearchParams({
      ...Object.fromEntries(searchParams.entries()),
      filterName,
    });
  };

  return (
    <div className={filterStyles.filter}>
      {FILTERS.map((filterName) => (
        <FilterItem
          filterName={filterName}
          filterItemHandler={filterItemHandler}
          key={filterName}
        />
      ))}
    </div>
  );
}
