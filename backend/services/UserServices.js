const User = require("../models/Userschema");

async function CreateUser(data, res) {
  try {
    const user = await User.create(data);
    const token = user.generateAuthToken();

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 1000,
    });

    return token;
  } catch (error) {
    throw new Error("Failed to store User in Db");
  }
}

module.exports = CreateUser;
