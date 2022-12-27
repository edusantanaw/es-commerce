import { LoadProductByCategory } from "../../../../presentational/product/loadByCategory";
import { makeLoadProductUsecase } from "../../usecases/loadProduct";

export function loadProductByCategoryFactory() {
  const loadProductUsecase = makeLoadProductUsecase();
  return new LoadProductByCategory(loadProductUsecase);
}
