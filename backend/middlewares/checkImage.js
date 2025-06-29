
module.exports = function (req, res, next) {
  console.log("Uploaded file:", req.file);
  if (!req.file) {
    return res.status(400).json({ error: "Product image is required" });
  }
  next();
};
