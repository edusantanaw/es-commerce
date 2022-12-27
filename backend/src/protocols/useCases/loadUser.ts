import { user } from "../../domain/entities/user";

export interface loadUserUsecase {
  loadById: (id: string) => Promise<user | null>;
  loadAll: () => Promise<user[] | null>;
}
