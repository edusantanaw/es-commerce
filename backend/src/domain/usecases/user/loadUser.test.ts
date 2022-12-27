import { UserRepositorySpy } from "../../../mocks/repositories/userRepositorySpy";
import { userRepository } from "../../../protocols/repository/userRepository";
import { validUser } from "../../../utils/helper/validUser";

class LoadUserUsecase {
  constructor(private userRepository: userRepository) {}
  async loadAll() {
    const users = await this.userRepository.loadAll();
    if (!users) return null;
    return users;
  }
  async loadById(id: string) {
    const user = await this.userRepository.loadById(id);
    if (!user) return null;
    return user;
  }
}

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
