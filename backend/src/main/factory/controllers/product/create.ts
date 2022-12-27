import { CreateProduct } from "../../../../presentational/product/create";
import { makeCreateProductUsecase } from "../../usecases/createProduct";

export function createProductFactory() {
  const createProductUsecase = makeCreateProductUsecase();
  return new CreateProduct(createProductUsecase);
}
