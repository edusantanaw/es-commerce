import { loadProductUsecase } from "../../protocols/useCases/loadProductUsecase";
import { InvalidParamError } from "../../utils/errors/InvalidParams";
import {
  badRequest,
  notContent,
  server,
  success,
} from "../../utils/helper/httpResponse";

export class LoadProductByName {
  constructor(private loadProductUseCase: loadProductUsecase) {}

  async handle({ name }: { name: string }) {
    try {
      if (!name) return badRequest(new InvalidParamError("name"));
      const products = await this.loadProductUseCase.loadByName(name);
      if (!products) return notContent("Product");
      return success(products);
    } catch (error) {
      return server(error);
    }
  }
}
