import { NavLink, Outlet } from "react-router-dom";
import { Filter } from "../../Filter/Filter";
import { UniversalPage } from "../UniversalPage/UniversalPage";
import productsStyles from "./Products.module.css";

export function Products() {
  return (
    <UniversalPage>
      <Filter>
        <NavLink
          className={({ isActive }) =>
            (isActive ? productsStyles.activeLink : productsStyles.filterLink)}
          to="/products"
          end
        >
          Все товары
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            (isActive ? productsStyles.activeLink : productsStyles.filterLink)}
          to="/"
        >
          Популярные
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            (isActive ? productsStyles.activeLink : productsStyles.filterLink)}
          to="/"
        >
          Новинки
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            (isActive ? productsStyles.activeLink : productsStyles.filterLink)}
          to="/"
        >
          Сначала дешевые
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            (isActive ? productsStyles.activeLink : productsStyles.filterLink)}
          to="/"
        >
          Сначала дорогие
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            (isActive ? productsStyles.activeLink : productsStyles.filterLink)}
          to="/"
        >
          По рейтингу
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            (isActive ? productsStyles.activeLink : productsStyles.filterLink)}
          to="/"
        >
          По скидке
        </NavLink>
      </Filter>

      <Outlet />
    </UniversalPage>
  );
}
