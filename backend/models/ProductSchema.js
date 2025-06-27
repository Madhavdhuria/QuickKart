import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },

  description: {
    type: String,
    required: true,
    trim: true,
  },

  price: {
    type: Number,
    required: true,
    min: 0,
  },

  category: {
    type: String,
    required: true,
    trim: true,
  },

  stock: {
    type: Number,
    required: true,
    min: 0,
  },

  images: [
    {
      url: {
        type: String,
        required: true,
        validate: {
          validator: (url) =>
            /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp))$/i.test(url),
          message: "Invalid image URL format",
        },
      },
      public_id: String, 
    }
  ],

  rating: {
    type: Number,
    default: 0,
  },

  numReviews: {
    type: Number,
    default: 0,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Product = mongoose.model("Product", ProductSchema);

export default Product;
