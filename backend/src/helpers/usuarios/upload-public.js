import multer from "multer";

import path from "node:path";
import { fileURLToPath } from "node:url";
import returnRes from "../returnRes.js";

const __fileName = fileURLToPath(import.meta.url);
const __dirName = path.dirname(__fileName);

const imageStore = multer.diskStorage({
  destination: (req, file, cb) => {
    let folder = "";

    if (req.url.includes("admin")) {
      folder = "administradores";
    } else if (req.url.includes("cliente")) {
      folder = "clientes";
    } else if (req.url.includes("motoboy")) {
      folder = "motoboys";
    }
    
    cb(null, path.join(__dirName, `../../../public/${folder}`));
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const imageUpload = multer({
  storage: imageStore,
  limits: { fileSize: "500000" },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png||jpg||webp)$/)) {
      return cb(
        new Error("Por favor, envie apenas arquivos: JPG, PNG ou WEBP")
      );
    }
    cb(null, true);
  },
});

const upload = (req, res, next) => {
  const uploadMiddleware = imageUpload.fields([
    { name: "foto", maxCount: 1 },
 ]);
 
  uploadMiddleware(req, res, (err) => {
    next();
  });
};

export default upload;
