import { data } from "../../protocols/presentational/userCreateData";
import { userRepository } from "../../protocols/repository/userRepository";
import { createUserUseCase } from "../../protocols/useCases/createUserUsecase";
import { EmailAlreadyBeingUsed } from "../../utils/helper/errors/emailAlreadyBeingUsed";

interface encrypter {
  genHash: (pass: string) => Promise<string>;
}

interface generateToken {
  generate: (userId: string, secret: string) => string;
}

export class CreateUserUseCase implements createUserUseCase {
  constructor(
    private encrypter: encrypter,
    private userRepository: userRepository,
    private generateToken: generateToken
  ) {}
  async create(data: data) {
    const verifyUserExists = await this.userRepository.loadByEmail(data.email);
    if (verifyUserExists) throw new EmailAlreadyBeingUsed().message;

    const hashPassword = await this.encrypter.genHash(data.password);
    data.password = hashPassword;

    const user = await this.userRepository.create(data);
    const accessToken = this.generateToken.generate(user.id, "secret");
    return { accessToken: accessToken, user: user };
  }
}
