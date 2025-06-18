import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();          // .env ko load kar lo, taaki SECRET_KEY mil jaye

const isAuthenticated = (req, res, next) => {
  try {
    // 1️⃣  Token nikalo
    const token = req.cookies?.token;      // optional‑chaining, undefined par crash nahi hoga

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated – token missing",
      });
    }

    // 2️⃣  Verify karo
    // jwt.verify sync hai, isliye await ki zaroorat nahi
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    // 3️⃣  Agar decode me kuch garbar: extremely rare, par check rakhna safe hai
    if (!decoded?.userId) {
      return res.status(401).json({
        success: false,
        message: "Invalid token payload",
      });
    }

    // 4️⃣  User ki id req object me daalo
    req.id = decoded.userId;
    next();                               // ✅  Authenticated, aage badho
  } catch (err) {
    console.error("JWT verify failed ➜", err.message);

    // jsonwebtoken library kuch specific errors throw karti hai:
    // TokenExpiredError, JsonWebTokenError, NotBeforeError, etc.
    return res.status(401).json({
      success: false,
      message: err.name === "TokenExpiredError"
        ? "Session expired, please login again"
        : "Authentication failed",
    });
  }
};

export default isAuthenticated;
