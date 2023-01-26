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
          to="/products/popular"
        >
          Популярные
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            (isActive ? productsStyles.activeLink : productsStyles.filterLink)}
          to="/products/newly"
        >
          Новинки
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            (isActive ? productsStyles.activeLink : productsStyles.filterLink)}
          to="/products/priceup"
        >
          Сначала дешевые
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            (isActive ? productsStyles.activeLink : productsStyles.filterLink)}
          to="/products/pricedown"
        >
          Сначала дорогие
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            (isActive ? productsStyles.activeLink : productsStyles.filterLink)}
          to="/products/rate"
        >
          По рейтингу
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            (isActive ? productsStyles.activeLink : productsStyles.filterLink)}
          to="/products/benefit"
        >
          По скидке
        </NavLink>
      </Filter>

      <Outlet />
    </UniversalPage>
  );
}
