import classNames from "classnames";
import { useSearchParams } from "react-router-dom";
import styles from "./FilterItem.module.css";

export function FilterItem({ filterName }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentFilterName = searchParams.get('filterName');
  const isActive = filterName === currentFilterName;

  const filterItemHandler = () => {
    if (isActive) {
      searchParams.delete('filterName');
      setSearchParams(searchParams);
    } else {
      setSearchParams({
        ...Object.fromEntries(searchParams.entries()),
        filterName,
      });
    }
  };

  return (
    <span
      className={classNames({
        [styles.noActive]: !isActive,
        [styles.active]: isActive
      })}
      onClick={() => filterItemHandler(/* filterName */)}
    >
      {filterName}
    </span>
  );
}
