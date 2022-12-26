import multer from "multer";
import { Request, Response, NextFunction } from "express";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now() + ".jpg" || ".png" || ".webp");
  },
});

const upload = multer({ storage: storage }).array("image");

export const multerMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  upload(req, res, (err) => {
    if (err) console.log(err);
    next(undefined);
  });
};
