import { category } from "../../domain/entities/category";

export interface loadCategoryUseCase {
  loadAll: () => Promise<category[] | null>;
  loadById: (id: string) => Promise<category | null>;
  loadByName: (name: string) => Promise<category[] | null>;
}
