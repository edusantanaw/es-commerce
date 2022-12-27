import { LoadProductById } from "../../../../presentational/product/loadById";
import { makeLoadProductUsecase } from "../../usecases/loadProduct";

export function loadProductByIdFactory() {
  const loadProductUsecase = makeLoadProductUsecase();
  return new LoadProductById(loadProductUsecase);
}
