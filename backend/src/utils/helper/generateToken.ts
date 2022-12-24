import jwt from "jsonwebtoken";

export class GenerateToken {
  generate(userId: string, secret: string) {
    const token = jwt.sign(userId, secret);
    return token;
  }
}
