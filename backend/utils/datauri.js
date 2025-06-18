// utils/datauri.js
import DataUriParser from "datauri/parser.js";
import path from "path";

const getDataUri = (file) => {
  if (!file) return null;               // ← avoids “file is undefined” crash
  const parser = new DataUriParser();
  const ext = path.extname(file.originalname).toString();
  return parser.format(ext, file.buffer);
};

export default getDataUri;
