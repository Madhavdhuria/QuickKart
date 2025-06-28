const express=require("express");
const router=express.Router();
const {CreateOrder}=require("../controllers/OrderControllers")


router.post("/CreateOrder",CreateOrder);


module.exports=router;

// 685e62e672d4602ba4dd79e2 user
// 685f8b8b12981d1b9c0620c0 product