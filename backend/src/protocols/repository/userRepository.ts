import { user } from "../../domain/entities/user";
import { data } from "../presentational/userCreateData";

export interface userRepository {
  loadByEmail: (email: string) => Promise<user | null>;
  create: (data: data) => Promise<user>;
}
