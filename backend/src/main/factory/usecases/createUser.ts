import { CreateUserUseCase } from "../../../domain/usecases/auth/createUserUseCase";
import { UserRepository } from "../../../infra/repositories/userRepository";
import { Encrypter } from "../../../utils/helper/encrypter";
import { GenerateToken } from "../../../utils/helper/generateToken";
import { SenderEmail } from "../../../utils/services/nodemailer";

export function makeCreateUserUseCase() {
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
