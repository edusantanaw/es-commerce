import { LoadUserUsecase } from "../../../domain/usecases/user/loadUser";
import { UserRepository } from "../../../infra/repositories/userRepository";

export function makeLoadUserUsecase() {
  const userRepository = new UserRepository();

  return new LoadUserUsecase(userRepository);
}
