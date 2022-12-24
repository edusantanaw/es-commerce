import { user } from "../../protocols/entity/user";
import { data } from "../../protocols/presentational/userCreateData";
import { CreateUserUseCase } from "./createUserUseCase";

class EncrypterSpy {
  async genHash(pass: string) {
    return "HashedPassword";
  }
}

const validUser = {
  id: "any_id",
  name: "valid_name",
  email: "invalid_email",
  password: "valid_password",
  confirmPassword: "valid_password",
};

class UserRepository {
  user: user | null = null;
  async loadByEmail(email: string) {
    if (this.user) return this.user;
    return null;
  }
  async create(data: data) {
    return (this.user = validUser);
  }
}

class GenerateToken {
  token = "token";
  generate(userId: string, secret: string) {
    return this.token;
  }
}

function makeSut() {
  const encrypter = new EncrypterSpy();
  const userRepository = new UserRepository();
  const generateToken = new GenerateToken();
  const createUserUseCase = new CreateUserUseCase(
    encrypter,
    userRepository,
    generateToken
  );
  return { createUserUseCase, encrypter, userRepository, generateToken };
}

describe("Create user use case", () => {
  test("Should throw if email provided is already being used", async () => {
    const { createUserUseCase, userRepository } = makeSut();
    userRepository.user = validUser;
    const response = createUserUseCase.create({
      name: "any_name",
      email: "already_used_email",
      password: "any_password",
      confirmPassword: "any_password",
    });
    expect(response).rejects.toThrow();
  });
});
