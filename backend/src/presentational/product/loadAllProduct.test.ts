import { LoadProductUsecaseSpy } from "../../mocks/useCases/loadProducts";
import { validProduct } from "./createProduct.test";
import { LoadAllProducts } from "./loadAllProducts";

function makeSut() {
  const loadProductUsecase = new LoadProductUsecaseSpy();
  const loadAllProducts = new LoadAllProducts(loadProductUsecase);
  return { loadAllProducts, loadProductUsecase };
}

describe("Load all products", () => {
  test("Should return status 204 if no one product are found", async () => {
    const { loadAllProducts } = makeSut();
    const response = await loadAllProducts.handle();
    expect(response.statusCode).toBe(204);
    expect(response.body).toBe("Products not found!");
  });
  test("Should return status 200 and an array of product", async () => {
    const { loadAllProducts, loadProductUsecase } = makeSut();
    loadProductUsecase.products = [validProduct, validProduct];
    const response = await loadAllProducts.handle();
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual([validProduct, validProduct]);
  });
});
