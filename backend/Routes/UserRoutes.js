const express = require("express");
const router = express.Router();
const {
  RegisterUser,
  LoginUser,
  GetUserOrders,
  CheckAuthentic,
  CheckisAdmin,
} = require("../controllers/UserControllers");

router.post("/register", RegisterUser);
router.post("/login", LoginUser);
router.get("/orders", GetUserOrders);
router.get("/me", CheckAuthentic);
router.get("/isAdmin", CheckisAdmin);

module.exports = router;
