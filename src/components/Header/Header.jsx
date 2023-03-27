import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getCartSelector } from "../../redux/slices/cartSlice";
import { getFavoritesSelector } from "../../redux/slices/favoritesSlice";
import { getTokenSelector } from "../../redux/slices/userSlice";
import { Logo } from "../Logo/Logo";
import { Search } from "../Search/Search";
import headerStyles from "./Header.module.css";

export function Header() {
  const token = useSelector(getTokenSelector);
  const cart = useSelector(getCartSelector);
  const favorites = useSelector(getFavoritesSelector);

  function isLogin() {
    if (token) {
      return (
        <>
          <div className={headerStyles.groupIcons}>
            <Link to="/favorites">
              <i className="fa-solid fa-heart" />
              {favorites.length ? (
                <div className={headerStyles.favoritesCount}>
                  {favorites.length}
                </div>
              ) : null}
            </Link>
            <Link to="/cart">
              <i className="fa-solid fa-cart-shopping" />
              {cart.length ? (
                <div className={headerStyles.cartCount}>{cart.length}</div>
              ) : null}
            </Link>
          </div>
          <Link to="/persona" className={headerStyles.profile}>
            <i className="fa-regular fa-circle-user" />
          </Link>
        </>
      );
    }
    return (
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
      <div className={headerStyles.containerIcons}>{isLogin()}</div>
    </header>
  );
}
