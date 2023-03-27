import stylesLoader from "./LoaderMini.module.css";

export function LoaderMini() {
  return (
    <div className="d-flex justify-content-center align-items-center">
      <div className={stylesLoader["lds-ripple"]}>
        <div />
        <div />
      </div>
    </div>
  );
}
