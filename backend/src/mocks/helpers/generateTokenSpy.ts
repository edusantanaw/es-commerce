export class GenerateTokenSpy {
  token = "token";
  generate(userId: string, secret: string) {
    return this.token;
  }
}
