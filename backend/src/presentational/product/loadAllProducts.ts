import { loadProductUsecase } from "../../protocols/useCases/loadProductUsecase";
import { notContent, server, success } from "../../utils/helper/httpResponse";

let count = 0;
export class LoadAllProducts {
  constructor(private loadProductUsecase: loadProductUsecase) {}
  async handle() {
    ++count;
    console.log(count);
    try {
      const products = await this.loadProductUsecase.loadAll();
      if (!products) return notContent("Products");
      return success(products);
    } catch (error) {
      return server(error);
    }
  }
}
