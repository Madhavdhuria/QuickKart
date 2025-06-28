const { OrderCreateSchema } = require("../Zod/OrderZod");
const { Create } = require("../services/OrderServices");

async function CreateOrder(req, res) {
  try {
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

module.exports = { CreateOrder };
