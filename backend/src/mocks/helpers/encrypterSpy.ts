export class EncrypterSpy {
  isEqual = false;
  async genHash(pass: string) {
    return "HashedPassword";
  }
  async compare(pass: string, userPass: string) {
    return this.isEqual;
  }
}
