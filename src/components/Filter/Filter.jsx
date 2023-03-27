import { FILTERS } from "../../utils/constants";
import { FilterItem } from "../FilterItem/FilterItem";
import filterStyles from "./Filter.module.css";

export function Filter() {
  return (
    <div className={filterStyles.filter}>
      {FILTERS.map((filterName) => (
        <FilterItem
          filterName={filterName}
          key={filterName}
        />
      ))}
    </div>
  );
}
