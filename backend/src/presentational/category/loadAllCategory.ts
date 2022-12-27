import { loadCategoryUseCase } from "../../protocols/useCases/loadCategory";
import { notContent, server, success } from "../../utils/helper/httpResponse";

export class LoadAllCategory {
  constructor(private readonly loadCategoryUseCase: loadCategoryUseCase) {}
  async handle() {
    try {
      const categories = await this.loadCategoryUseCase.loadAll();
      if (!categories) return notContent("Category");
      return success(categories);
    } catch (error) {
      return server(error);
    }
  }
}
