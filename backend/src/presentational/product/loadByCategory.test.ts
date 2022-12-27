import { LoadProductUsecaseSpy } from "../../mocks/useCases/loadProducts";
import { notContent, success } from "../../utils/helper/httpResponse";
import { validProduct } from "./createProduct.test";
import { LoadProductByCategory } from "./loadByCategory";

function makeSut() {
  const loadProductUsecase = new LoadProductUsecaseSpy();
  const loadByCategory = new LoadProductByCategory(loadProductUsecase);
  return { loadByCategory, loadProductUsecase };
}

describe("Load products by category", () => {
  test("Should return status 400 an an invalid param if categoryId is not provided", async () => {
    const { loadByCategory } = makeSut();
    const response = await loadByCategory.handle({ categoryId: "" });
    expect(response.statusCode).toBe(400);
    expect(response.body).toBe("Invalid param: categoryId");
  });

  test("Should return status 204 if content is not found", async () => {
    const { loadByCategory } = makeSut();
    const response = await loadByCategory.handle({ categoryId: "anyId" });
    expect(response).toEqual(notContent("Products"));
  });
  test("Should return status 200 if is found", async () => {
    const { loadByCategory, loadProductUsecase } = makeSut();
    loadProductUsecase.products = [validProduct, validProduct];
    const response = await loadByCategory.handle({ categoryId: "anyId" });
    expect(response).toEqual(success([validProduct, validProduct]));
  });
});
