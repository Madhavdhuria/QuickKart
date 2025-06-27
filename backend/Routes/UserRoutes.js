const express = require("express");

const router = express.Router();
const {RegisterUser,LoginUser} = require("../controllers/UserControllers")

router.post("/register",RegisterUser);

router.post("/login",LoginUser); 

// router.get("/profile", protect, getUserProfile);
// router.put("/profile", protect, updateUserProfile);

// router.get("/all", protect, isAdmin, getAllUsers);
// router.delete("/:id", protect, isAdmin, deleteUserById);
// router.put("/role/:id", protect, isAdmin, updateUserRole);

module.exports = router;
