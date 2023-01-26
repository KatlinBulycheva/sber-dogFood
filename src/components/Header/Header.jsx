import { Link } from "react-router-dom";
import headerStyles from "./Header.module.css";
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
      <div className={headerStyles.search}>
        <input type="text" placeholder="Поиск" />
      </div>
      <div className={headerStyles.containerIcons}>
        <div className={headerStyles.groupIcons}>
          <i className="fa-solid fa-heart" />
          <i className="fa-solid fa-cart-shopping" />
        </div>
        <div className={headerStyles.groupIcons}>
          <Link to="/signin">
            <i className="fa-solid fa-right-to-bracket" />
          </Link>
          <Link to="/signup">
            <i className="fa-solid fa-user-plus" />
          </Link>
        </div>
        <Link to="/persona">
          <i className="fa-regular fa-circle-user" />
        </Link>
      </div>
    </header>
  );
}
