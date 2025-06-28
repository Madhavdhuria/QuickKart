module.exports = function (req, res, next) {
  if (!req.file) {
    return res.status(400).json({ error: "Product image is required" });
  }
  next();
};
