import { Router } from "express";
import adapt from "../adapter/express-adapter";
import { makeUserCreateFactory } from "../factory/userCreateFactory";

export default (router: Router) => {
  router.post("/user/create", adapt(makeUserCreateFactory()));
};
