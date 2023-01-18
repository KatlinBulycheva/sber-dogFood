import { Link } from "react-router-dom";
import headerStyles from "./header.module.css";
import logo from "./logo.png";

export function Header() {
  return (
    <header>
      <Link to="/">
        <div className={headerStyles.logoContainer}>
          <img src={logo} alt="logo" className={headerStyles.logoImg} />
          <h3 className={headerStyles.logoText}>DOG <br /> FOOD</h3>
        </div>
      </Link>
      <div className={headerStyles.rightContainer}>
        <input type="text" />
        <i className="fa-solid fa-heart" />
        <i className="fa-solid fa-cart-shopping" />
        <Link to="/signin">
          <i className="fa-solid fa-right-to-bracket" />
        </Link>
        <Link to="/signup">
          <i className="fa-solid fa-user-plus" />
        </Link>
      </div>
    </header>
  );
}
