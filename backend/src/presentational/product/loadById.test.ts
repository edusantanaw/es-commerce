import { LoadProductUsecaseSpy } from "../../mocks/useCases/loadProducts";
import { InvalidParamError } from "../../utils/errors/InvalidParams";
import { notContent, success } from "../../utils/helper/httpResponse";
import { validProduct } from "./createProduct.test";
import { LoadProductById } from "./loadById";

function makeSut() {
  const loadProductUseCase = new LoadProductUsecaseSpy();
  const loadProductById = new LoadProductById(loadProductUseCase);
  return { loadProductById, loadProductUseCase };
}

describe("Load product by id", () => {
  test("Should return status code 400 and invalid param error if id is not provided", async () => {
    const { loadProductById } = makeSut();
    const response = await loadProductById.handle({ id: "" });
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual(new InvalidParamError("id").message);
  });
  test("Should return status code 204 if product is not found", async () => {
    const { loadProductById } = makeSut();
    const response = await loadProductById.handle({ id: "any_id" });
    expect(response.statusCode).toBe(204);
    expect(response.body).toEqual(notContent("Product").body);
  });

  test("Should return status 200 and an product", async () => {
    const { loadProductById, loadProductUseCase } = makeSut();
    loadProductUseCase.product = validProduct;
    const response = await loadProductById.handle({ id: "any_id" });
    expect(response.statusCode).toBe(200);
    expect(response.body).toBe(success(validProduct).body);
  });
});
