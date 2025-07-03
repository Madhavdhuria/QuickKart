const express = require("express");
const router = express.Router();
const isAuthenticated = require("../middlewares/authMiddleware");
const { CreateOrder,GetOrders,GetAllOrdersForAdmin,updateOrderStatus,CancelOrder } = require("../controllers/OrderControllers");

router.post("/CreateOrder", isAuthenticated, CreateOrder);
router.get("/GetOrders", isAuthenticated, GetOrders);
router.get("/GetAllOrdersForAdmin",GetAllOrdersForAdmin);
router.put("/updateOrderStatus/:id",updateOrderStatus);
router.put("/CancelOrder",CancelOrder);

module.exports = router;
