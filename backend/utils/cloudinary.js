const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dcskts1go",
  api_key: "134449598571996",
  api_secret: "mFm3LG6LuOg7vTo2k20C9Ym-sKQ",
});

module.exports = cloudinary;