import { user } from "../../domain/entities/user";
import { AuthUseCase } from "../../protocols/useCases/authUsecase";

export class AuthUseCaseSpy implements AuthUseCase {
  token = "token";
  user: user | null = null;
  passIsValid = false;
  async auth(email: string, password: string) {
    this.user;
    this.token;
    if (this.user) {
      if (this.passIsValid) {
        return { user: this.user, accessToken: this.token };
      }
      throw "Password is invalid!";
    }
    throw "User not found!";
  }
}
