import { loadProductUsecase } from "../../protocols/useCases/loadProductUsecase";
import { notContent, server, success } from "../../utils/helper/httpResponse";

export class LoadAllProducts {
  constructor(private loadProductUsecase: loadProductUsecase) {}
  async handle() {
    try {
      const products = await this.loadProductUsecase.loadAll();
      if (!products) return notContent("Products");
      return success(products);
    } catch (error) {
      return server(error);
    }
  }
}
