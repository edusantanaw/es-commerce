import { user } from "../../domain/entities/user";

export const validUser: user = {
  id: "any_id",
  name: "valid_name",
  email: "invalid_email",
  password: "valid_password",
  actived: true,
  activedKey: "any",
};
