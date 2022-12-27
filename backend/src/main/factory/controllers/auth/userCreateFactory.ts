import { UserCreateController } from "../../../../presentational/auth/create";
import { EmailValidator } from "../../../../utils/helper/emailValidator";
import { makeCreateUserUseCase } from "../../usecases/createUser";

export function makeUserCreateFactory() {
  const emailValidator = new EmailValidator();
  const createUserUseCase = makeCreateUserUseCase();

  return new UserCreateController(emailValidator, createUserUseCase);
}
