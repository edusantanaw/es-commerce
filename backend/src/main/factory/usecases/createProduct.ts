import { CreteProductUsecase } from "../../../domain/usecases/product/create";
import { CategoryRepository } from "../../../infra/repositories/categoryRepository";
import { ProductRepository } from "../../../infra/repositories/productRepository";

export function makeCreateProductUsecase() {
  const categoryRepository = new CategoryRepository();
  const productRepoitory = new ProductRepository();
  return new CreteProductUsecase(categoryRepository, productRepoitory);
}
