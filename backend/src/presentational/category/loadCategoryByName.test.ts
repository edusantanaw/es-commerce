import { LoadCategoryUseCase } from "../../mocks/useCases/loadCategory";
import { InvalidParamError } from "../../utils/errors/InvalidParams";
import { badRequest } from "../../utils/helper/httpResponse";
import { LoadCategoryByName } from "./loadCategoryByName";

function makeSut() {
  const loadCategoryUseCase = new LoadCategoryUseCase();
  const loadCategoryByName = new LoadCategoryByName(loadCategoryUseCase);
  return { loadCategoryUseCase, loadCategoryByName };
}

describe("Load category by id", () => {
  test("Should return status 400 if name is not provided", async () => {
    const { loadCategoryByName } = makeSut();
    const response = await loadCategoryByName.handle({ name: "" });
    expect(response).toEqual(badRequest(new InvalidParamError("name")));
  });
  test("should return status 204 if category not found", async () => {
    const { loadCategoryByName } = makeSut();
    const response = await loadCategoryByName.handle({ name: "any_name" });
    expect(response.statusCode).toBe(204);
    expect(response.body).toBe("Category not found!");
  });
  test("should return status 200", async () => {
    const { loadCategoryByName, loadCategoryUseCase } = makeSut();
    loadCategoryUseCase.categories = [{ id: "any_id", name: "any_name" }];
    const response = await loadCategoryByName.handle({ name: "any_name" });
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual([{ id: "any_id", name: "any_name" }]);
  });
});
