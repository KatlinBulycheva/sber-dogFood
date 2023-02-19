import { Filter } from "../../Filter/Filter";
import { ProductsInner } from "../../ProductsInner/ProductsInner";
import { UniversalPage } from "../UniversalPage/UniversalPage";

export function Products() {
  return (
    <UniversalPage>
      <Filter />
      <ProductsInner />
    </UniversalPage>
  );
}
