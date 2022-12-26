import { category } from "../../domain/entities/category";

export interface categoryRepository {
  create: (name: string) => Promise<void>;
  loadByName: (name: string) => Promise<category[] | null>;
  loadById: (id: string) => Promise<category | null>;
  loadAll: () => Promise<category[] | null>;
}
