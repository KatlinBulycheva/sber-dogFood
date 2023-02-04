import stylesLoader from "./Loader.module.css";

export function Loader() {
  return (
    <div className="d-flex justify-content-center align-items-center">
      <div className={stylesLoader["lds-ripple"]}>
        <div />
        <div />
      </div>
    </div>
  );
}
