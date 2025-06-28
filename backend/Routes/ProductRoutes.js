const express = require("express");
const router = express.Router();
const { Create } = require("../controllers/ProductControllers");
const { upload } = require("../utils/multer");
const checkImage = require("../middlewares/checkImage");

router.post(
  "/CreateProduct",
  upload.single("ProductImage"),
  checkImage,
  Create
);

module.exports = router;
