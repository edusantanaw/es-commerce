import { LoadProductUsecase } from "../../../domain/usecases/product/loadProduct";
import { ProductRepository } from "../../../infra/repositories/productRepository";
import { Cache } from "../../../infra/cache/cache";

export function makeLoadProductUsecase() {
  const cacheRepository = new Cache();
  const productRepoitory = new ProductRepository();

  return new LoadProductUsecase(cacheRepository, productRepoitory);
}
