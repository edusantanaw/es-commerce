import { UserRepositorySpy } from "../../../mocks/repositories/userRepositorySpy";
import { validUser } from "../../../utils/helper/validUser";
import { LoadUserUsecase } from "./loadUser";

function makeSut() {
  const userRepository = new UserRepositorySpy();
  const loadUserUsecase = new LoadUserUsecase(userRepository);
  return { userRepository, loadUserUsecase };
}

describe("Load user use case", () => {
  test("Should return null if users are not found", async () => {
    const { loadUserUsecase } = makeSut();
    const respone = await loadUserUsecase.loadAll();
    expect(respone).toBe(null);
  });
  test("Should return an array of users if users are found", async () => {
    const { loadUserUsecase, userRepository } = makeSut();
    userRepository.users = [validUser, validUser];
    const respone = await loadUserUsecase.loadAll();
    expect(respone).toEqual([validUser, validUser]);
  });
  test("Should return null if user is not found", async () => {
    const { loadUserUsecase } = makeSut();
    const respone = await loadUserUsecase.loadById("any_id");
    expect(respone).toBe(null);
  });
  test("Should return an user if is found", async () => {
    const { loadUserUsecase, userRepository } = makeSut();
    userRepository.user = validUser;
    const respone = await loadUserUsecase.loadById("any_id");
    expect(respone).toEqual(validUser);
  });
});
