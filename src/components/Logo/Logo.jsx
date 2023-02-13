import { Link } from "react-router-dom";
import logoStyles from "./Logo.module.css";
import logo from "./logo.png";

export function Logo() {
  return (
    <Link to="/">
      <div className={logoStyles.logoContainer}>
        <img src={logo} alt="logo" className={logoStyles.logoImg} />
        <h3 className={logoStyles.logoText}>DOG <br /> FOOD</h3>
      </div>
    </Link>
  );
}
