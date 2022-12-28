import { dataUpdate } from "../repository/productRepoitory";

export type data = {
  id: string;
  name: string;
  categoryId: string;
  price: number | null;
};
export interface updateProductUsecase {
  update: (data: dataUpdate) => Promise<boolean>;
}
