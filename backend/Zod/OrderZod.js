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

  shippingInfo: z.object({
    fullName: z.string().min(1, "Full name is required"),
    addressLine: z.string().min(1, "Address is required"),
    city: z.string().min(1, "City is required"),
    state: z.string().min(1, "State is required"),
    pincode: z.string().min(1, "Pincode is required"),
    phone: z.string().min(10, "Phone number is required"),
  }),
});

module.exports = { OrderCreateSchema };
