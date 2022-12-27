import { data } from "../../protocols/repository/productRepoitory";
import { product } from "../../prisma/prisma";

export class ProductRepository {
  async create(data: data) {
    const prodResponse = await product.create({
      data: data,
    });
    return prodResponse;
  }

  async loadAll() {
    const products = await product.findMany();
    return products;
  }

  async loadById(id: string) {
    const productReponse = await product.findFirst({
      where: {
        id: id,
      },
    });
    return productReponse;
  }

  async loadByName(name: string) {
    const productsResponse = await product.findMany({
      where: {
        name: name,
      },
    });
    if (productsResponse.length > 0) return productsResponse;
    return null;
  }

  async loadByCategory(categoryId: string) {
    const products = await product.findMany({
      where: {
        categoryId: categoryId,
      },
    });
    return products;
  }
}
