import multer from "multer";
import { Request, Response, NextFunction } from "express";

const storage = multer.diskStorage({
  destination: (req, files, cb) => {
    cb(null, "public");
  },
  filename: (req, files, cb) => {
    cb(null, files.fieldname + "-" + Date.now() + ".jpg" || ".png" || ".webp");
  },
});

const upload = multer({ storage: storage }).array("images", 5);

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
