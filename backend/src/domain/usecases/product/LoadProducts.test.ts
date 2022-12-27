import { ProductRepositorySpy } from "../../../mocks/repositories/productRepository";
import { validProduct } from "../../../presentational/product/createProduct.test";
import { cache } from "../../../protocols/cache/cache";
import { productRepository } from "../../../protocols/repository/productRepoitory";
import { product } from "../../entities/product";

const loadAllProductKey = "loadAllProduct";

class LoadProductUsecase {
  constructor(
    private readonly cache: cache,
    private productRepository: productRepository
  ) {}

  async loadAll() {
    const productCache = await this.cache.get(loadAllProductKey);
    if (productCache) return productCache;
    const productsDb = await this.productRepository.loadAll();
    if (productsDb) await this.cache.set(productsDb, loadAllProductKey);
    return productsDb;
  }
}

class CacheSpy {
  data: any[] | null = null;
  async get<T>(key: string) {
    return this.data;
  }
  async set<T>(data: T[], key: string) {
    this.data;
    return;
  }
  async update<T>(data: T[], key: string) {
    this.data;
    return;
  }
  async remove(key: string) {
    return;
  }
}

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
    const { loadProductUsecase } = makeSut();
    const response = await loadProductUsecase.loadAll();
    expect(response).toBe(null);
  });
});
