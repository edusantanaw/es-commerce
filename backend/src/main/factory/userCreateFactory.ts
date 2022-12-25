import { CreateUserUseCase } from "../../domain/usecases/createUserUseCase";
import { UserRepository } from "../../infra/repositories/userRepository";
import { UserCreateController } from "../../presentational/auth/create";
import { EmailValidator } from "../../utils/helper/emailValidator";
import { Encrypter } from "../../utils/helper/encrypter";
import { GenerateToken } from "../../utils/helper/generateToken";

export function makeUserCreateFactory() {
  const userRepository = new UserRepository();
  const emailValidator = new EmailValidator();
  const generateToken = new GenerateToken();
  const encrypter = new Encrypter();

  const createUserUseCase = new CreateUserUseCase(
    encrypter,
    userRepository,
    generateToken
  );

  return new UserCreateController(emailValidator, createUserUseCase);
}
