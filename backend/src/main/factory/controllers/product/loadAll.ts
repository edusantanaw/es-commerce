import { LoadAllProducts } from "../../../../presentational/product/loadAllProducts";
import { makeLoadProductUsecase } from "../../usecases/loadProduct";

export function makeLoadAllProductsFactory() {
  const loadProductUsecase = makeLoadProductUsecase();
  return new LoadAllProducts(loadProductUsecase);
}
