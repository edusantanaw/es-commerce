import { loadProductUsecase } from "../../protocols/useCases/loadProductUsecase";
import httpResponse from "../../utils/helper/httpResponse";

export class LoadAllProducts {
  constructor(private loadProductUsecase: loadProductUsecase) {}
  async handle() {
    try {
      const products = await this.loadProductUsecase.loadAll();
      if (!products) return httpResponse.notContent("Products");
      return httpResponse.success(products);
    } catch (error) {
      return httpResponse.catch(error);
    }
  }
}
