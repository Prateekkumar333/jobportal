// middlewares/multer.js
import multer from "multer";

// — memoryStorage keeps the file in RAM so Cloudinary can read the buffer
const storage = multer.memoryStorage();

export const singleUpload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB max
}).single("file"); // ← field name must match the frontend
