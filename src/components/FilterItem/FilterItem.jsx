import classNames from "classnames";
import { useSearchParams } from "react-router-dom";
import styles from "./FilterItem.module.css";

export function FilterItem({ filterName, filterItemHandler }) {
  const [searchParams] = useSearchParams();
  const currentFilterName = searchParams.get('filterName');
  const isActive = filterName === currentFilterName;

  return (
    <span
      className={classNames({
        [styles.noActive]: !isActive,
        [styles.active]: isActive
      })}
      onClick={() => filterItemHandler(filterName)}
    >
      {filterName}
    </span>
  );
}
