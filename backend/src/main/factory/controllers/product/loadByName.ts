import { LoadProductByName } from "../../../../presentational/product/loadByName";
import { makeLoadProductUsecase } from "../../usecases/loadProduct";

export function loadProductByNameFactory() {
  const loadProductUsecase = makeLoadProductUsecase();
  return new LoadProductByName(loadProductUsecase);
}
