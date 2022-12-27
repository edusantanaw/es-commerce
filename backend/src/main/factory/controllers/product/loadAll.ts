import { LoadAllProducts } from "../../../../presentational/product/loadAllProducts";
import { makeLoadProductUsecase } from "../../usecases/loadProduct";

export function loadAllProductsFactory() {
  const loadProductUsecase = makeLoadProductUsecase();
  return new LoadAllProducts(loadProductUsecase);
}
