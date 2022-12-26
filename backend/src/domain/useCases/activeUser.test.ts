import { UserRepositorySpy } from "../../mocks/repositories/userRepositorySpy";
import { userRepository } from "../../protocols/repository/userRepository";
import { validUser } from "../../utils/helper/validUser";

class ActiveUseCase {
  constructor(private readonly userRepository: userRepository) {}

  async active(userId: string, key: string) {
    const user = await this.userRepository.loadById(userId);
    if (!user) throw "User not found!";
    if (user.activedKey !== key) throw "Key is not valid!";
    await this.userRepository.activeUser(userId);
    return true;
  }
}

function makeSut() {
  const userRepository = new UserRepositorySpy();
  const activeUseCase = new ActiveUseCase(userRepository);
  return { activeUseCase, userRepository };
}

describe("Active user", () => {
  test("Should throw if user not found", async () => {
    const { activeUseCase } = makeSut();
    const response = activeUseCase.active("invalid_userid", "any_key");
    expect(response).rejects.toBe("User not found!");
  });
  test("Should throw if key is not valid", async () => {
    const { activeUseCase, userRepository } = makeSut();
    userRepository.user = validUser;
    const response = activeUseCase.active("valid_userid", "invalid_key");
    expect(response).rejects.toBe("Key is not valid!");
  });
  test("Should throw if key is not valid", async () => {
    const { activeUseCase, userRepository } = makeSut();
    userRepository.user = validUser;
    const response = await activeUseCase.active("valid_userid", "valid_key");
    expect(response).toBe(true);
  });
});
