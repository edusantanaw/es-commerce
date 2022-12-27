import { loadCategoryUseCase } from "../../protocols/useCases/loadCategory";
import { InvalidParamError } from "../../utils/errors/InvalidParams";
import {
  badRequest,
  notContent,
  server,
  success,
} from "../../utils/helper/httpResponse";

export class LoadCategoryById {
  constructor(private loadCategoryUsecase: loadCategoryUseCase) {}

  async handle({ id }: { id: string }) {
    try {
      if (!id) return badRequest(new InvalidParamError("id"));
      const category = await this.loadCategoryUsecase.loadById(id);
      if (!category) return notContent("Category");
      return success(category);
    } catch (error) {
      return server(error);
    }
  }
}
