import { ActiveUser } from "../../../../presentational/user/active";
import { makeActiveUserUsecase } from "../../usecases/activeUser";

export function activeUserFactory() {
  const activeUserUsecase = makeActiveUserUsecase();
  return new ActiveUser(activeUserUsecase);
}
