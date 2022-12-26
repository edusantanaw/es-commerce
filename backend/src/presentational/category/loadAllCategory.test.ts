import { LoadCategoryUseCase } from "../../mocks/useCases/loadCategory";
import httpResponse from "../../utils/helper/httpResponse";
import { LoadAllCategory } from "./loadAllCategory";

function makeSut() {
  const loadCategoryUseCase = new LoadCategoryUseCase();
  const loadAllCategory = new LoadAllCategory(loadCategoryUseCase);
  return { loadAllCategory, loadCategoryUseCase };
}

describe("Load all category", () => {
  test("should return status code 204 if categories not found", async () => {
    const { loadAllCategory } = makeSut();
    const response = await loadAllCategory.handle();
    expect(response).toEqual(httpResponse.notContent("Category"));
  });
  test("should return status code 200 and all categories", async () => {
    const { loadAllCategory, loadCategoryUseCase } = makeSut();
    loadCategoryUseCase.categories = [{ id: "any_id", name: "any_name" }];
    const response = await loadAllCategory.handle();
    expect(response).toEqual(
      httpResponse.success([{ id: "any_id", name: "any_name" }])
    );
  });
});
