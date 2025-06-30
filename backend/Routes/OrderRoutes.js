const express = require("express");
const router = express.Router();
const isAuthenticated = require("../middlewares/authMiddleware");
const { CreateOrder,GetOrders,GetAllOrdersForAdmin,updateOrderStatus } = require("../controllers/OrderControllers");

router.post("/CreateOrder", isAuthenticated, CreateOrder);
router.get("/GetOrders", isAuthenticated, GetOrders);
router.get("/GetAllOrdersForAdmin",GetAllOrdersForAdmin);
router.put("/updateOrderStatus/:id",updateOrderStatus);

module.exports = router;
