const express = require("express");
const router = express.Router();
const {
  Create,
  GetProducts,
  GetProduct,
  DeleteProducts,
  DeleteProductById,
} = require("../controllers/ProductControllers");
const { upload } = require("../utils/multer");
const checkImage = require("../middlewares/checkImage");

router.post(
  "/CreateProduct",
  upload.single("ProductImage"),
  checkImage,
  Create
);

router.post("/products", upload.single("ProductImage"), checkImage, Create);
router.get("/products", GetProducts);
router.get("/product/:id", GetProduct);
router.delete("/products", DeleteProducts);
router.delete("/products/:id", DeleteProductById);

module.exports = router;
