const { z } = require("zod");

const OrderCreateSchema = z.object({
  user: z.string().min(1, "User ID is required"),
  items: z.array(
    z.object({
      product: z.string().min(1, "Product ID is required"),
      quantity: z.coerce.number().min(1, "Quantity must be at least 1"),
    })
  ).min(1, "At least one item is required"),
  totalPrice: z.coerce.number().min(0, "Total Price must be positive"),
  status: z.enum(["pending", "shipped", "delivered", "cancelled"]),
  paymentMethod: z.string().min(1, "Payment method is required"),
});

module.exports = { OrderCreateSchema };
