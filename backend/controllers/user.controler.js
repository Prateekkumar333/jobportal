// controllers/user.controller.js
import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

/* ---------- helper: upload to Cloudinary if file present ---------- */
const maybeUploadToCloudinary = async (file) => {
  if (!file) return undefined; // skip when no file
  const fileUri = getDataUri(file);
  if (!fileUri) return undefined; // sanity
  const { secure_url } = await cloudinary.uploader.upload(fileUri.content);
  return secure_url;
};

/* ---------- REGISTER ---------- */
export const register = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, password, role } = req.body;

    if (!fullname || !email || !phoneNumber || !password || !role) {
      return res
        .status(400)
        .json({ message: "All fields are required", success: false });
    }

    if (await User.findOne({ email })) {
      return res
        .status(400)
        .json({ message: "Email already registered", success: false });
    }

    const profilePhotoUrl = await maybeUploadToCloudinary(req.file);
    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      fullname,
      email,
      phoneNumber,
      password: hashedPassword,
      role,
      profile: { profilePhoto: profilePhotoUrl },
    });

    return res
      .status(201)
      .json({ message: "Account created successfully.", success: true });
  } catch (error) {
    console.error("Register error:", error);
    return res.status(500).json({ message: "Server error", success: false });
  }
};

/* ---------- LOGIN ---------- */
export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res
        .status(400)
        .json({ message: "All fields are required", success: false });
    }

    const user = await User.findOne({ email });
    if (
      !user ||
      !(await bcrypt.compare(password, user.password)) ||
      role !== user.role
    ) {
      return res
        .status(400)
        .json({ message: "Invalid credentials", success: false });
    }

    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    /* sanitized user object */
    const safeUser = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: true,
        sameSite: "none",
      })
      .json({
        message: `Welcome back ${user.fullname}`,
        user: safeUser,
        success: true,
      });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Server error", success: false });
  }
};

/* ---------- LOGOUT ---------- */
export const logout = (req, res) =>
  res
    .status(200)
    .cookie("token", "", { maxAge: 0 })
    .json({ message: "Logged out", success: true });

/* ---------- UPDATE PROFILE ---------- */
export const updateProfile = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, bio, skills } = req.body;
    const user = await User.findById(req.id); // set by isAuthenticated middleware

    if (!user)
      return res
        .status(404)
        .json({ message: "User not found", success: false });

    // optional file upload
    const resumeUrl = await maybeUploadToCloudinary(req.file);

    if (fullname) user.fullname = fullname;
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (bio) user.profile.bio = bio;
    if (skills) user.profile.skills = skills.split(",").map((s) => s.trim());
    if (resumeUrl) {
      user.profile.resume = resumeUrl;
      user.profile.resumeOriginalName = req.file.originalname;
    }

    await user.save();

    return res
      .status(200)
      .json({ message: "Profile updated", user, success: true });
  } catch (error) {
    console.error("Profile update error:", error);
    return res.status(500).json({ message: "Server error", success: false });
  }
};
