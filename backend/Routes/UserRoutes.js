const express = require("express");
const router = express.Router();
const {
  RegisterUser,
  LoginUser,
  GetUserOrders,
  CheckAuthentic
} = require("../controllers/UserControllers");

router.post("/register", RegisterUser);
router.post("/login", LoginUser);
router.get("/orders", GetUserOrders);
router.get("/me",CheckAuthentic);

module.exports = router;
