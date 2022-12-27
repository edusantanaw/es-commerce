import { LoadUserById } from "../../../../presentational/user/loadUserById";
import { makeLoadUserUsecase } from "../../usecases/loadUser";

export function LoadUserByIdFactory() {
  const loadUserUsecase = makeLoadUserUsecase();
  return new LoadUserById(loadUserUsecase);
}
