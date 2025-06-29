const Cart = require("../models/CartSchema");
const Product = require("../models/ProductSchema");

const addToCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const { productId, quantity } = req.body;
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    const existingItem = cart.items.find(
      (item) => item.productId.toString() === productId
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ productId, quantity });
    }

    await cart.save();
    res.status(200).json({ message: "Item added to cart", cart });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const cart = await Cart.findOne({ userId }).populate("items.productId");

    if (!cart) return res.status(200).json({ items: [] });

    res.status(200).json(cart);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const removeCartItem = async (req, res) => {
  try {
    const userId = req.user._id;
    const productId = req.params.productId;

    const cart = await Cart.findOne({ userId });

    if (!cart) return res.status(404).json({ error: "Cart not found" });

    cart.items = cart.items.filter(
      (item) => item.productId.toString() !== productId
    );

    await cart.save();

    res.status(200).json({ message: "Item removed", cart });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const clearCart = async (req, res) => {
  try {
    const userId = req.user._id;
    await Cart.findOneAndDelete({ userId });
    res.status(200).json({ message: "Cart cleared" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  addToCart,
  getCart,
  removeCartItem,
  clearCart,
};
