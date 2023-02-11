import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getCartSelector } from "../../redux/slices/cartSlice";
import { getTokenSelector } from "../../redux/slices/userSlice";
import { Logo } from "../Logo/Logo";
import { Search } from "../Search/Search";
import headerStyles from "./Header.module.css";
// import logo from "./logo.png";

export function Header() {
  const token = useSelector(getTokenSelector);
  const cart = useSelector(getCartSelector);

  function isLogin() {
    if (token) {
      return (
        <>
          <div className={headerStyles.groupIcons}>
            <i className="fa-solid fa-heart" />
            <Link to="/cart">
              <i className="fa-solid fa-cart-shopping" />
            </Link>
            {cart.length ? <div className={headerStyles.cartCount}>{cart.length}</div> : null}
          </div>
          <Link to="/persona" className={headerStyles.profile}>
            <i className="fa-regular fa-circle-user" />
          </Link>
        </>
      );
    } return (
      <div className={headerStyles.groupIcons}>
        <Link to="/signin">
          <i className="fa-solid fa-right-to-bracket" />
        </Link>
        <Link to="/signup">
          <i className="fa-solid fa-user-plus" />
        </Link>
      </div>
    );
  }

  return (
    <header>
      <Logo />
      <div className={headerStyles.catalog}>
        <Link to="/products">
          <i className="fa-solid fa-bars" />
        </Link>
        <Search />
      </div>
      <div className={headerStyles.containerIcons}>
        {isLogin()}
      </div>
    </header>
  );
}
