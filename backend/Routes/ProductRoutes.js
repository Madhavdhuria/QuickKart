const express = require("express");
const router = express.Router();
const {
  Create,
  GetProducts,
  GetProduct,
  DeleteProducts,
  DeleteProductById,
  FetchCategories,
  UpdateProduct
} = require("../controllers/ProductControllers");
const { upload } = require("../utils/multer");
const checkImage = require("../middlewares/checkImage");

router.post(
  "/CreateProduct",
  upload.single("ProductImage"),
  checkImage,
  Create
);

router.put("/update/:id",UpdateProduct);
router.get("/products", GetProducts);
router.get("/product/:id", GetProduct);
router.delete("/products", DeleteProducts);
router.delete("/products/:id", DeleteProductById);
router.get("/categories",FetchCategories);

module.exports = router;
