import { AuthUseCase } from "../../../domain/usecases/auth/authUsecase";
import { UserRepository } from "../../../infra/repositories/userRepository";
import { Encrypter } from "../../../utils/helper/encrypter";
import { GenerateToken } from "../../../utils/helper/generateToken";

export function makeAuthUseCase() {
  const userRepository = new UserRepository();
  const encrypter = new Encrypter();
  const generateToken = new GenerateToken();
  return new AuthUseCase(userRepository, encrypter, generateToken);
}
