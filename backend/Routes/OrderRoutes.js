const express=require("express");
const router=express.Router();
const {CreateOrder}=require("../controllers/OrderControllers")


router.post("/CreateOrder",CreateOrder);

module.exports=router;
