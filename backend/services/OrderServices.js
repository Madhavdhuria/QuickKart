const Product = require("../models/ProductSchema");
const User = require("../models/Userschema");
const Order = require("../models/Orderschema");

async function Create(data) {
  try {
    const { user: userId, items } = data;

    const user = await User.findById(userId);
    if (!user) throw new Error("Invalid User ID");

    for (const item of items) {
      const product = await Product.findById(item.product);
      if (!product) throw new Error(`Invalid Product ID: ${item.product}`);
    }

    const newOrder = await Order.create(data);
    return newOrder;
  } catch (err) {
    throw new Error(err.message);
  }
}

module.exports = { Create };
