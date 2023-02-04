import filterStyles from "./Filter.module.css";

export function Filter({ children }) {
  return (
    <div className={filterStyles.filter}>
      {children}
    </div>
  );
}
