import { CategoryRepositorySpy } from "../../../mocks/repositories/categoryRepository";
import { LoadCategoryUseCase } from "./loadCategorie";

function makeSut() {
  const categoryRepository = new CategoryRepositorySpy();
  const loadCategoryUseCase = new LoadCategoryUseCase(categoryRepository);
  return { categoryRepository, loadCategoryUseCase };
}

describe("Load category use case", () => {
  test("Should return null if categories not found", async () => {
    const { loadCategoryUseCase } = makeSut();
    const response = await loadCategoryUseCase.loadAll();
    expect(response).toBe(null);
  });

  test("Should return an array of categories", async () => {
    const { loadCategoryUseCase, categoryRepository } = makeSut();
    categoryRepository.categories = [{ id: "any_id", name: "any_name" }];
    const response = await loadCategoryUseCase.loadAll();
    expect(response).toEqual([{ id: "any_id", name: "any_name" }]);
  });

  test("Should return null if no one category is found", async () => {
    const { loadCategoryUseCase } = makeSut();
    const response = await loadCategoryUseCase.loadByName("not_exists_name");
    expect(response).toBe(null);
  });

  test("Should return null if no one category is found", async () => {
    const { loadCategoryUseCase, categoryRepository } = makeSut();
    categoryRepository.categories = [{ id: "any_id", name: "any_name" }];
    const response = await loadCategoryUseCase.loadByName("not_exists_name");
    expect(response).toEqual([{ id: "any_id", name: "any_name" }]);
  });
  test("Should return null if category not found", async () => {
    const { loadCategoryUseCase } = makeSut();
    const response = await loadCategoryUseCase.loadByName("invalid_id");
    expect(response).toBe(null);
  });
  test("Should return null if category not found", async () => {
    const { loadCategoryUseCase, categoryRepository } = makeSut();
    categoryRepository.category = { id: "any_id", name: "any_name" };
    const response = await loadCategoryUseCase.loadById("any_id");
    expect(response).toEqual({ id: "any_id", name: "any_name" });
  });
});
