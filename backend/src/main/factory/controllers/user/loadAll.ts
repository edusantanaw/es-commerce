import { LoadAllUsers } from "../../../../presentational/user/loadAll";
import { makeLoadUserUsecase } from "../../usecases/loadUser";

export function loadAllUserFactory() {
  const loadUserUsecase = makeLoadUserUsecase();
  return new LoadAllUsers(loadUserUsecase);
}
