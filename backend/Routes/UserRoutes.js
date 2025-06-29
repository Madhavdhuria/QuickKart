const express = require("express");
const router = express.Router();
const {
  RegisterUser,
  LoginUser,
  GetUserOrders,
  CheckAuthentic,
  CheckisAdmin,
  GetAllUsers,
  DeleteUserAndReferences
} = require("../controllers/UserControllers");

router.post("/register", RegisterUser);
router.post("/login", LoginUser);
router.get("/orders", GetUserOrders);
router.get("/me", CheckAuthentic);
router.get("/isAdmin", CheckisAdmin);
router.get("/getAllusers", GetAllUsers);
router.delete("/delete/:id", DeleteUserAndReferences);

module.exports = router;
