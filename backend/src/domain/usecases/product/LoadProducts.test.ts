import { CacheSpy } from "../../../mocks/repositories/cache";
import { ProductRepositorySpy } from "../../../mocks/repositories/productRepository";
import { validProduct } from "../../../presentational/product/createProduct.test";
import { LoadProductUsecase } from "./loadProduct";

function makeSut() {
  const cache = new CacheSpy();
  const productRepository = new ProductRepositorySpy();
  const loadProductUsecase = new LoadProductUsecase(cache, productRepository);
  return { cache, productRepository, loadProductUsecase };
}

describe("Load products use case", () => {
  test("Should return product of cache if exists", async () => {
    const { cache, loadProductUsecase } = makeSut();
    cache.data = [validProduct, validProduct];
    const response = await loadProductUsecase.loadAll();
    expect(response).toEqual(cache.data);
  });
  test("Should return null if product not found in cache or database ", async () => {
    const { loadProductUsecase } = makeSut();
    const response = await loadProductUsecase.loadAll();
    expect(response).toBe(null);
  });
  test("Should return null if product not found in cache or database ", async () => {
    const { loadProductUsecase, productRepository } = makeSut();
    productRepository.products = [validProduct, validProduct];
    const response = await loadProductUsecase.loadAll();
    expect(response).toBe(productRepository.products);
  });
  test("Should return product of cache if exists", async () => {
    const { cache, loadProductUsecase } = makeSut();
    cache.data = [validProduct, validProduct];
    const response = await loadProductUsecase.loadByCategory("any_id");
    expect(response).toEqual(cache.data);
  });
  test("Should return null if product not found in cache or database ", async () => {
    const { loadProductUsecase } = makeSut();
    const response = await loadProductUsecase.loadByCategory("any_id");
    expect(response).toBe(null);
  });
  test("Should return null if product not found in cache or database ", async () => {
    const { loadProductUsecase, productRepository } = makeSut();
    productRepository.products = [validProduct, validProduct];
    const response = await loadProductUsecase.loadByCategory("any_category");
    expect(response).toBe(productRepository.products);
  });

  test("Should return null if product is not found", async () => {
    const { loadProductUsecase, productRepository } = makeSut();
    productRepository.product = null;
    const response = await loadProductUsecase.loadById("any_id");
    expect(response).toBe(null);
  });
  test("Should return an product if is found", async () => {
    const { loadProductUsecase, productRepository } = makeSut();
    productRepository.product = validProduct;
    const response = await loadProductUsecase.loadById("any_id");
    expect(response).toBe(validProduct);
  });
  test("Should return null if products are not found", async () => {
    const { loadProductUsecase, productRepository } = makeSut();
    productRepository.product = null;
    const response = await loadProductUsecase.loadByName("any_name");
    expect(response).toBe(null);
  });
  test("Should return null if products are not found", async () => {
    const { loadProductUsecase, productRepository } = makeSut();
    productRepository.products = [validProduct, validProduct];
    productRepository.product = null;
    const response = await loadProductUsecase.loadByName("any_name");
    expect(response).toEqual([validProduct, validProduct]);
  });
});
