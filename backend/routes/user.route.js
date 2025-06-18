// routes/user.route.js
import express from "express";
import { login, logout, register, updateProfile } from "../controllers/user.controler.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { singleUpload } from "../middlewares/multer.js";

const router = express.Router();

router.post("/register", singleUpload, register);               // upload field: "file"
router.post("/login", login);
router.get("/logout", logout);
router.put("/profile/update", isAuthenticated, singleUpload, updateProfile);

export default router;
