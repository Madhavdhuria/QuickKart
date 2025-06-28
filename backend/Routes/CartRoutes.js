const express = require("express");
const router = express.Router();
const {
  addToCart,
  getCart,
  updateCartItem,
  removeCartItem,
  clearCart,
} = require("../controllers/CartController");

const isAuthenticated = require("../middlewares/authMiddleware"); 

router.post("/add", isAuthenticated, addToCart);
router.get("/", isAuthenticated, getCart);
router.put("/update", isAuthenticated, updateCartItem);
router.delete("/remove/:productId", isAuthenticated, removeCartItem);
router.delete("/clear", isAuthenticated, clearCart);

module.exports = router;
