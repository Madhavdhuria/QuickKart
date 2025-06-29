const express = require("express");
const router = express.Router();
const isAuthenticated = require("../middlewares/authMiddleware");
const { CreateOrder,GetOrders } = require("../controllers/OrderControllers");

router.post("/CreateOrder", isAuthenticated, CreateOrder);
router.get("/GetOrders", isAuthenticated, GetOrders);

module.exports = router;
