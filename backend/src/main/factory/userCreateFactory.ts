import { CreateUserUseCase } from "../../domain/usecases/auth/createUserUseCase";
import { UserRepository } from "../../infra/repositories/userRepository";
import { UserCreateController } from "../../presentational/auth/create";
import { EmailValidator } from "../../utils/helper/emailValidator";
import { Encrypter } from "../../utils/helper/encrypter";
import { GenerateToken } from "../../utils/helper/generateToken";
import { SenderEmail } from "../../utils/helper/nodemailer";

function makeCreateUserUseCase() {
  const userRepository = new UserRepository();
  const generateToken = new GenerateToken();
  const sendeEmail = new SenderEmail();
  const encrypter = new Encrypter();

  return new CreateUserUseCase(
    encrypter,
    userRepository,
    generateToken,
    sendeEmail
  );
}

export function makeUserCreateFactory() {
  const emailValidator = new EmailValidator();
  const createUserUseCase = makeCreateUserUseCase();

  return new UserCreateController(emailValidator, createUserUseCase);
}
