import { LoadCategoryByName } from "../../../../presentational/category/loadCategoryByName";
import { makeLoadCategoryUsecase } from "../../usecases/loadCategory";

export function loadCategorByNameFactory() {
  const loadCategoryUseCase = makeLoadCategoryUsecase();
  return new LoadCategoryByName(loadCategoryUseCase);
}
