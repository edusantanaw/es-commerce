import bcrypt from "bcrypt";

export class Encrypter {
  async genHash(pass: string) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(pass, salt);
    return hashedPassword;
  }
}
