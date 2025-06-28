const express = require("express");
const router = express.Router();
const {
  RegisterUser,
  LoginUser,
  GetUserOrders,
} = require("../controllers/UserControllers");

router.post("/register", RegisterUser);
router.post("/login", LoginUser);
router.get("/orders", GetUserOrders);

module.exports = router;
