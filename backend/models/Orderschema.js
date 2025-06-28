const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  items: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
      quantity: {
        type: Number,
        required: true,
        min: 1,
      },
    },
  ],

  shippingInfo: {
    fullName: { type: String, required: true },
    addressLine: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pincode: { type: String, required: true },
    phone: { type: String, required: true },
  },

  totalPrice: {
    type: Number,
    required: true,
    min: 0,
  },

  status: {
    type: String,
    enum: ["pending", "shipped", "delivered", "cancelled"],
    default: "pending",
  },

  paymentInfo: {
    id: String,
    status: String,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Order = mongoose.model("Order", OrderSchema);

module.exports = Order;
