const jwt = require("jsonwebtoken");
const User = require("../models/Userschema");

const isAuthenticated = async (req, res, next) => {
  try {
    const token =
      req.cookies?.token || (req.headers.authorization?.startsWith("Bearer ") 
        ? req.headers.authorization.split(" ")[1] 
        : null);

    if (!token) {
      return res.status(401).json({ error: "Unauthorized: No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({ error: "Unauthorized: User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Auth error:", error);
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};

module.exports = isAuthenticated;
