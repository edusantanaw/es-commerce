import { product } from "../../domain/entities/product";

export interface createProductUsecase {
  create: (data: {
    name: string;
    categoryId: string;
    price: number;
    images: string[];
  }) => Promise<product>;
}
