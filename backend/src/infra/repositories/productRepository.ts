import { data } from "../../protocols/repository/productRepoitory";
import { product } from "../../prisma/prisma";

export class ProductRepository {
  async create(data: data) {
    const prodResponse = await product.create({
      data: data,
    });
    return prodResponse;
  }
}
