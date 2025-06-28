const { userCreateSchema } = require("../Zod/UserZod");
const User = require("../models/Userschema");
const CreateUser = require("../services/UserServices");
const jwt = require("jsonwebtoken");
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

    const jwtToken = await CreateUser(parsed.data);

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

module.exports = { RegisterUser, LoginUser, GetUserOrders };
