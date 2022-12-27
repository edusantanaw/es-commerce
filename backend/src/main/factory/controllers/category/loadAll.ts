import { LoadAllCategory } from "../../../../presentational/category/loadAllCategory";
import { makeLoadCategoryUsecase } from "../../usecases/loadCategory";

export function makeLoadAllCategory() {
  const loadCategoryUseCase = makeLoadCategoryUsecase();
  return new LoadAllCategory(loadCategoryUseCase);
}
