import { AuthUseCase } from "../../domain/usecases/authUseCase.test";
import { UserRepository } from "../../infra/repositories/userRepository";
import { SigninController } from "../../presentational/auth/signin";
import { EmailValidator } from "../../utils/helper/emailValidator";
import { Encrypter } from "../../utils/helper/encrypter";
import { GenerateToken } from "../../utils/helper/generateToken";

function makeAuthUseCase() {
  const userRepository = new UserRepository();
  const encrypter = new Encrypter();
  const generateToken = new GenerateToken();
  return new AuthUseCase(userRepository, encrypter, generateToken);
}

export function makeSigninfactory() {
  const authUseCase = makeAuthUseCase();
  const emailValidator = new EmailValidator();
  const signController = new SigninController(emailValidator, authUseCase);
  return signController;
}
