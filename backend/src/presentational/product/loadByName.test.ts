import { LoadProductUsecaseSpy } from "../../mocks/useCases/loadProducts";
import { InvalidParamError } from "../../utils/errors/InvalidParams";
import { notContent } from "../../utils/helper/httpResponse";
import { validProduct } from "./createProduct.test";
import { LoadProductByName } from "./loadByName";

function makeSut() {
  const loadProductUseCase = new LoadProductUsecaseSpy();
  const loadProductById = new LoadProductByName(loadProductUseCase);
  return { loadProductById, loadProductUseCase };
}

describe("Load product by name", () => {
  test("Should return status code 400 and invalid param error if name is not provided", async () => {
    const { loadProductById } = makeSut();
    const response = await loadProductById.handle({ name: "" });
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual(new InvalidParamError("name").message);
  });
  test("Should return status code 204 if products are not found", async () => {
    const { loadProductById } = makeSut();
    const response = await loadProductById.handle({ name: "any_id" });
    expect(response.statusCode).toBe(204);
    expect(response.body).toEqual(notContent("Product").body);
  });

  test("Should return status 200 and an array of products", async () => {
    const { loadProductById, loadProductUseCase } = makeSut();
    loadProductUseCase.products = [validProduct];
    const response = await loadProductById.handle({ name: "any_id" });
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual([validProduct]);
  });
});
