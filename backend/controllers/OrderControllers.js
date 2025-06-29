const { OrderCreateSchema } = require("../Zod/OrderZod");
const { Create } = require("../services/OrderServices");
const { GetOrders: GetUserOrders } = require("../services/OrderServices");

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

module.exports = { CreateOrder, GetOrders };
