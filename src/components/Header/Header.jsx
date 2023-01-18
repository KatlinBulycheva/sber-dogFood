import headerStyles from "./header.module.css";
import logo from "./logo.png";

export function Header() {
  return (
    <header>
      <div className={headerStyles.logoContainer}>
        <img src={logo} alt="logo" className={headerStyles.logoImg} />
        <h3 className={headerStyles.logoText}>DOG <br /> FOOD</h3>
      </div>
      <div className={headerStyles.rightContainer}>
        <input type="text" />
        <i className="fa-solid fa-heart" />
        <i className="fa-solid fa-cart-shopping" />
        <i className="fa-solid fa-right-to-bracket" />
        <i className="fa-solid fa-user-plus" />
      </div>
    </header>
  );
}
