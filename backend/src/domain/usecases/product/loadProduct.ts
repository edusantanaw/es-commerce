import { cache } from "../../../protocols/cache/cache";
import { productRepository } from "../../../protocols/repository/productRepoitory";

export const loadAllProductKey = "loadAllProduct";
const loadProductByCategoryKey = "loadProductByCategory";

export class LoadProductUsecase {
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

  async loadByCategory(categoryId: string) {
    const productCache = await this.cache.get(
      loadProductByCategoryKey + categoryId
    );
    if (productCache) return productCache;
    const products = await this.productRepository.loadByCategory(categoryId);
    if (products)
      await this.cache.set(products, loadProductByCategoryKey + categoryId);
    return products;
  }

  async loadById(id: string) {
    const product = await this.productRepository.loadById(id);
    return product;
  }

  async loadByName(name: string) {
    const products = await this.productRepository.loadByName(name);
    return products;
  }
}
