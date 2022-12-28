import { Router } from "express";
import adapt from "../adapter/express-adapter";
import { makeCreateProductFactory } from "../factory/controllers/product/create";
import { makeLoadAllProductsFactory } from "../factory/controllers/product/loadAll";
import { multerMiddleware } from "../middlewares/multer";

export default (router: Router) => {
  router.post("/product", multerMiddleware, adapt(makeCreateProductFactory()));
  router.get("/products", adapt(makeLoadAllProductsFactory()));
};
