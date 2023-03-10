import { user } from "../../domain/entities/user";
import { data } from "../presentational/userCreateData";

export interface userRepository {
  loadByEmail: (email: string) => Promise<user | null>;
  create: (data: data) => Promise<user>;
  loadById: (id: string) => Promise<user | null>;
  activeUser: (userId: string) => Promise<void>;
  loadAll: () => Promise<user[] | null>;
}
