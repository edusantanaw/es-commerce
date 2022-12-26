import { LoadCategoryUseCase } from "../../mocks/useCases/loadCategory";
import { InvalidParamError } from "../../utils/errors/InvalidParams";
import httpResponse from "../../utils/helper/httpResponse";
import { LoadCategoryById } from "./loadCategoryById";

function makeSut() {
  const loadCategoryUseCase = new LoadCategoryUseCase();
  const loadCategoryById = new LoadCategoryById(loadCategoryUseCase);
  return { loadCategoryUseCase, loadCategoryById };
}

describe("Load category by id", () => {
  test("Should return status 400 if id is not provided", async () => {
    const { loadCategoryById } = makeSut();
    const response = await loadCategoryById.handle({ id: "" });
    expect(response).toEqual(
      httpResponse.badRequest(new InvalidParamError("id"))
    );
  });
  test("should return status 204 if category not found", async () => {
    const { loadCategoryById } = makeSut();
    const response = await loadCategoryById.handle({ id: "any_id" });
    expect(response.statusCode).toBe(204);
    expect(response.body).toBe("Category not found!");
  });
  test("should return status 200", async () => {
    const { loadCategoryById, loadCategoryUseCase } = makeSut();
    loadCategoryUseCase.category = { id: "any_id", name: "any_name" };
    const response = await loadCategoryById.handle({ id: "any_id" });
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ id: "any_id", name: "any_name" });
  });
});
