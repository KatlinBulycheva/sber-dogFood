import stylesUniversalPage from "./UniversalPage.module.css";

export function UniversalPage({ children }) {
  return (
    <main className={stylesUniversalPage.page}>
      {children}
    </main>
  );
}
