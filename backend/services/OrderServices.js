const Product = require("../models/ProductSchema");
const User = require("../models/Userschema");
const Order = require("../models/Orderschema");
const Cart = require("../models/CartSchema");

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

    await Cart.findOneAndUpdate({ userId }, { items: [] });

    return newOrder;
  } catch (err) {
    throw new Error(err.message);
  }
}

async function GetOrders(id) {
  try {
    const user = await User.findById(id);

    if (!user) {
      throw new Error("Unable to find user");
    }

    const orders = await Order.find({ user: id })
      .populate("items.product")
      .sort({ createdAt: -1 });
    return orders;
  } catch (error) {
    throw new Error(err.message);
  }
}

async function UpdateOrder(id) {
  try {
    const existingOrder = await Order.findById(id);

    if (!existingOrder) {
      const error = new Error("Order not found");
      error.statusCode = 404;
      throw error;
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { $set: { status: "cancelled" } },
      { new: true } 
    );

    return updatedOrder;
  } catch (error) {
    throw error;
  }
}


module.exports = { Create, GetOrders, UpdateOrder };
