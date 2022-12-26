import { category } from "../../domain/entities/category";
import httpResponse from "../../utils/helper/httpResponse";

interface loadCategoryUseCase {
  loadAll: () => Promise<category[]>;
}

class LoadAllCategory {
  constructor(private readonly loadCategoryUseCase: loadCategoryUseCase) {}
  async handle() {
    try {
      const categories = await this.loadCategoryUseCase.loadAll();
      if (categories.length === 0) return httpResponse.notContent("Category");
      return httpResponse.success(categories);
    } catch (error) {
      return httpResponse.catch(error);
    }
  }
}

class LoadCategoryUseCase {
  categories: category[] = [];
  async loadAll() {
    return this.categories;
  }
}

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
