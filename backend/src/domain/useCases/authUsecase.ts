import { encrypter } from "../../protocols/helpers/encrypter";
import { generateToken } from "../../protocols/helpers/generateToken";
import { userRepository } from "../../protocols/repository/userRepository";

export class AuthUseCase {
  constructor(
    private readonly userRepository: userRepository,
    private readonly encrypter: encrypter,
    private readonly generateToken: generateToken
  ) {}
  async auth(email: string, password: string) {
    const user = await this.userRepository.loadByEmail(email);
    if (!user) throw "User not found!";

    const isPassValid = await this.encrypter.compare(password, user.password);
    if (!isPassValid) throw "Password is invalid!";

    const token = this.generateToken.generate(user.id, "secret");
    return { accessToken: token, user: user };
  }
}
