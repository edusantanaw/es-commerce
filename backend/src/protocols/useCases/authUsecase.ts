import { user } from "../../domain/entities/user";

export interface AuthUseCase {
  auth: (
    email: string,
    password: string
  ) => Promise<{ accessToken: string; user: user }>;
}
