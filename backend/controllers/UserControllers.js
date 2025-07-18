const { userCreateSchema } = require("../Zod/UserZod");
const User = require("../models/Userschema");
const CreateUser = require("../services/UserServices");
const jwt = require("jsonwebtoken");
const Order = require("../models/Orderschema");
const Cart = require("../models/CartSchema");
const { GetOrders } = require("../services/OrderServices");

async function RegisterUser(req, res) {
  try {
    const parsed = userCreateSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        message: "Validation failed",
        errors: parsed.error.errors,
      });
    }

    const ExistingUser = await User.findOne({ email: req.body.email });

    if (ExistingUser) {
      throw new Error("User with the same Email Already exists !!");
    }

    const jwtToken = await CreateUser(parsed.data, res);

    return res.status(201).json({
      message: "User registered successfully",
      token: jwtToken,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

async function LoginUser(req, res) {
  const { email, password } = req.body;

  try {
    if (!email || !password) throw new Error("Invalid inputs !");

    const ExistingUser = await User.findOne({ email: req.body.email });

    if (!ExistingUser) {
      throw new Error("Invalid Credentials !!");
    }

    const isMatch = await ExistingUser.comparePassword(password);

    if (!isMatch) {
      throw new Error("Invalid Credentials !!");
    }

    const token = ExistingUser.generateAuthToken();

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 1000,
    });

    return res.status(200).json({
      message: "Logged In successfully !!",
      token,
      ExistingUser,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
}

async function GetUserOrders(req, res) {
  const token =
    req.cookies?.token || (req.headers.authorization?.split(" ")[1] ?? null);

  if (!token) {
    return res
      .status(401)
      .json({ message: "Authentication token is required" });
  }

  try {
    let decoded = jwt.verify(token, process.env.JWT_SECRET);

    const orders = await GetOrders(decoded.id);

    return res.json({ orders });
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}

async function CheckAuthentic(req, res) {
  const token =
    req.cookies?.token || (req.headers.authorization?.split(" ")[1] ?? null);

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    res.status(200).json({ message: "Authenticated", user });
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}

async function CheckisAdmin(req, res) {
  const token =
    req.cookies?.token || (req.headers.authorization?.split(" ")[1] ?? null);

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    console.log(user);

    if (user.role !== "admin") {
      return res.status(403).json({ message: "Forbidden: Admins only" });
    }

    return res.status(200).json({ message: "Authenticated", user });
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}

async function GetAllUsers(req, res) {
  try {
    const token =
      req.cookies?.token || (req.headers.authorization?.split(" ")[1] ?? null);

    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided" });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }

    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.role !== "admin") {
      return res.status(403).json({ message: "Forbidden: Admins only" });
    }

    const users = await User.find({ _id: { $ne: user._id } }).select(
      "-password"
    );

    return res.status(200).json({ users });
  } catch (error) {
    return res.status(500).json({
      message: "Unable to get users",
      error: error.message,
    });
  }
}

const DeleteUserAndReferences = async (req, res) => {
  try {
    const userId = req.params.id;
    console.log(userId);
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    await Order.deleteMany({ _id: { $in: user.orders } });

    await Cart.findOneAndDelete({ userId });

    await User.findByIdAndDelete(userId);

    res.json({
      message: "User, cart, and related orders deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete user and related data",
      error: error.message,
    });
  }
};

module.exports = {
  RegisterUser,
  LoginUser,
  GetUserOrders,
  CheckAuthentic,
  CheckisAdmin,
  GetAllUsers,
  DeleteUserAndReferences,
};
