import { ActiveUseCase } from "../../../domain/usecases/user/activeUser";
import { UserRepository } from "../../../infra/repositories/userRepository";

export function makeActiveUserUsecase() {
  const userRepository = new UserRepository();

  return new ActiveUseCase(userRepository);
}
