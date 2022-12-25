export interface encrypter {
  genHash: (pass: string) => Promise<string>;
  compare: (pass: string, userPass: string) => Promise<boolean>;
}
