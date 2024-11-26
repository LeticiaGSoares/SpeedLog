import multer from "multer";

import path from "node:path";
import { fileURLToPath } from "node:url";

const __fileName = fileURLToPath(import.meta.url);

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    cb(null, false);
  }
});

const formDataMiddleware = upload.none();

export default formDataMiddleware;
