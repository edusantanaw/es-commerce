import { loadCategoryUseCase } from "../../protocols/useCases/loadCategory";
import httpResponse from "../../utils/helper/httpResponse";

export class LoadAllCategory {
  constructor(private readonly loadCategoryUseCase: loadCategoryUseCase) {}
  async handle() {
    try {
      const categories = await this.loadCategoryUseCase.loadAll();
      if (!categories) return httpResponse.notContent("Category");
      return httpResponse.success(categories);
    } catch (error) {
      return httpResponse.catch(error);
    }
  }
}
