import { user } from "../../domain/entities/user";
import { data } from "../presentational/userCreateData";

export interface createUserUseCase {
  create: (data: data) => Promise<{ accessToken: string; user: user }>;
}
