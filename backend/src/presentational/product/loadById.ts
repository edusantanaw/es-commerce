import { loadProductUsecase } from "../../protocols/useCases/loadProductUsecase";
import { InvalidParamError } from "../../utils/errors/InvalidParams";
import {
  badRequest,
  notContent,
  server,
  success,
} from "../../utils/helper/httpResponse";

export class LoadProductById {
  constructor(private loadProductUseCase: loadProductUsecase) {}

  async handle({ id }: { id: string }) {
    try {
      if (!id) return badRequest(new InvalidParamError("id"));
      const product = await this.loadProductUseCase.loadById(id);
      if (!product) return notContent("Product");
      return success(product);
    } catch (error) {
      return server(error);
    }
  }
}
