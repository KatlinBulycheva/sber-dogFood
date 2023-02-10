import stylesUniversalPage from "./UniversalPage.module.css";

export function UniversalPage({ children, ...props }) {
  const lengthProps = Object.keys(props).length;
  const display = lengthProps ? props.wrStyles.display : '';
  const gridTemplateColumns = lengthProps ? props.wrStyles.gridTemplateColumns : '';
  const gap = lengthProps ? props.wrStyles.gap : '';
  return (
    <main
      className={stylesUniversalPage.page}
      style={{
        display,
        gridTemplateColumns,
        gap
      }}
    >
      {children}
    </main>
  );
}
