export interface generateToken {
  generate: (userId: string, secret: string) => string;
}
