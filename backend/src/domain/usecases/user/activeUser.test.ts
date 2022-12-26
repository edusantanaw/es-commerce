import { UserRepositorySpy } from "../../../mocks/repositories/userRepositorySpy";
import { validUser } from "../../../utils/helper/validUser";
import { ActiveUseCase } from "./activeUser";

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
