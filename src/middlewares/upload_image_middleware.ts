import multer from "multer";
import crypto from "crypto";

const whitelist = ["image/png", "image/jpeg", "image/jpg", "image/webp"];

const upload =
  process.env.NODE_ENV === "production"
    ? multer({ dest: "" })
    : multer({
        storage: multer.diskStorage({
          destination: __dirname + "/../temp",
          filename: (req, file, callback) => {
            callback(
              null,
              `${crypto.randomUUID()}.${file.mimetype.split("/")[1]}`
            );
          },
        }),
        fileFilter: (req, file, callback) => {
          if (!whitelist.includes(file.mimetype)) {
            return callback(new Error("file is not allowed"));
          }

          callback(null, true);
        },
      });

export const uploadImageMiddleware = upload;
