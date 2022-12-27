import { loadProductUsecase } from "../../protocols/useCases/loadProductUsecase";
import { InvalidParamError } from "../../utils/errors/InvalidParams";
import {
  badRequest,
  notContent,
  server,
  success,
} from "../../utils/helper/httpResponse";

export class LoadByCategory {
  constructor(private loadProductUsecase: loadProductUsecase) {}
  async handle({ categoryId }: { categoryId: string }) {
    try {
      if (!categoryId) return badRequest(new InvalidParamError("categoryId"));
      const products = await this.loadProductUsecase.loadByCategory(categoryId);
      if (!products) return notContent("Products");
      return success(products);
    } catch (error) {
      return server(error);
    }
  }
}
