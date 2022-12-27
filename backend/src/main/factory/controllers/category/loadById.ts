import { LoadCategoryById } from "../../../../presentational/category/loadCategoryById";
import { makeLoadCategoryUsecase } from "../../usecases/loadCategory";

export function loadCategorByIdFactory() {
  const loadCategoryUseCase = makeLoadCategoryUsecase();
  return new LoadCategoryById(loadCategoryUseCase);
}
