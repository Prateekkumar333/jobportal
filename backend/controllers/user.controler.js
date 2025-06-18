import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import { uploadImage, deleteImage } from "../utils/cloudinary.js";

export const register = async (req, res) => {
  try {
    

    const { fullname, email, phoneNumber, password, role } = req.body;

    if (!fullname || !email || !phoneNumber || !password || !role) {
      return res.status(400).json({ message: "All fields are required", success: false });
    }

    // ✅ Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists with this email", success: false });
    }

    // ✅ Handle profile photo only if provided
    let cloudResponse = null;
    if (req.file) {
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
      if (!allowedTypes.includes(req.file.mimetype)) {
        return res.status(400).json({ message: "Only JPEG, PNG, or GIF images are allowed", success: false });
      }

      const fileUri = getDataUri(req.file);
      console.log('Uploading to Cloudinary…');
      cloudResponse = await uploadImage(fileUri.content, { public_id: `profile_${Date.now()}` });
      console.log('Cloudinary response:', cloudResponse);
    }

    // ✅ Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ Create user
    await User.create({
      fullname,
      email,
      phoneNumber,
      password: hashedPassword,
      role,
      profile: {
        profilePhoto: cloudResponse?.secure_url || null,            // null if no photo
        profilePhotoPublicId: cloudResponse?.public_id || null,     // null if no photo
      },
    });

    return res.status(201).json({ message: "Account created successfully", success: true });
  } catch (error) {
    console.error("Registration error:", error);
    const isCloudErr = error.message?.includes('Cloudinary');
    return res.status(500).json({
      message: isCloudErr ? "Failed to upload profile photo to Cloudinary" : "Server error during registration",
      success: false,
      error: error.message,
    });
  }
};


// ... (login, logout, updateProfile unchanged)
export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Incorrect email or password",
        success: false,
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        message: "Incorrect email or password",
        success: false,
      });
    }

    if (role !== user.role) {
      return res.status(400).json({
        message: "Account doesn't exist with current role",
        success: false,
      });
    }

    const tokenData = { userId: user._id };
    const token = jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' });

    const userData = {
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
        sameSite: 'strict',
      })
      .json({
        message: `Welcome back ${user.fullname}`,
        user: userData,
        success: true,
      });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({
      message: "Server error during login",
      success: false,
    });
  }
};

export const logout = async (req, res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      message: "Logged out successfully",
      success: true,
    });
  } catch (error) {
    console.error("Logout error:", error);
    return res.status(500).json({
      message: "Server error during logout",
      success: false,
    });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, bio, skills } = req.body;
    const uid = req.user._id;                                     // isAuthenticated sets this

    const user = await User.findById(uid);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    // basic fields
    user.fullname     = fullname;
    user.email        = email;
    user.phoneNumber  = phoneNumber;
    user.profile.bio  = bio;
    user.profile.skills = skills
      ? skills.split(",").map(s => s.trim())
      : user.profile.skills;

    /* ----------  resume (PDF) upload OPTIONAL ---------- */
    if (req.file) {
      const fileUri = getDataUri(req.file);
      const cloud   = await cloudinary.uploader.upload(fileUri.content, {
        resource_type: "raw",
        folder: "resumes",
      });
      user.profile.resume            = cloud.secure_url;
      user.profile.resumeOriginalName = req.file.originalname;
    }

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user,
    });
  } catch (err) {
    console.error("Update Profile Error ▶", err);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};