const { OrderCreateSchema } = require("../Zod/OrderZod");
const { Create } = require("../services/OrderServices");
const {
  GetOrders: GetUserOrders,
  UpdateOrder,
} = require("../services/OrderServices");
const Order = require("../models/Orderschema");

async function CreateOrder(req, res) {
  try {
    req.body.user = req.user.id;

    const result = OrderCreateSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ error: result.error.format() });
    }

    const NewOrder = await Create(result.data);

    return res.json({
      message: "Order Created SuccessFully",
      NewOrder,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
}

async function GetOrders(req, res) {
  try {
    const userId = req.user.id;
    const orders = await GetUserOrders(userId);
    return res.status(200).json({
      orders,
    });
  } catch (error) {
    console.error("Error in GetOrders:", error);
    return res.status(500).json({ error: "Failed to fetch orders" });
  }
}

async function GetAllOrdersForAdmin(req, res) {
  try {
    const orders = await Order.find({})
      .populate("items.product")
      .populate("user", "userName email");

    return res.json({
      orders,
    });
  } catch (error) {
    res.json({
      message: "Unable to fetch all orders",
      error: error.message,
    });
  }
}

async function updateOrderStatus(req, res) {
  try {
    const { status } = req.body;
    const { id } = req.params;

    if (!status) {
      return res.status(400).json({ message: "Status is required" });
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({
      message: "Order status updated successfully",
      order: updatedOrder,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update order status",
      error: error.message,
    });
  }
}

async function CancelOrder(req, res) {
  try {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ message: "Order Id required!" });
    }

    const updatedOrder = await UpdateOrder(id);

    return res.status(200).json({ updatedOrder });
  } catch (error) {
    return res.status(error.statusCode || 500).json({ message: error.message });
  }
}


module.exports = {
  CreateOrder,
  GetOrders,
  GetAllOrdersForAdmin,
  updateOrderStatus,
  CancelOrder,
};
