const { ProductCreateSchema } = require("../Zod/ProductZod");
const cloudinary = require("../utils/cloudinary");
const { CreateProduct } = require("../services/ProductServices");
const fs = require("fs");
const Product = require("../models/ProductSchema");

async function Create(req, res) {
  try {
    const result = ProductCreateSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ error: result.error.format() });
    }

    const cloudRes = await cloudinary.uploader.upload(req.file.path, {
      folder: "QuickKart",
    });

    const images = [];
    images.push({
      url: cloudRes.secure_url,
    });
    const newProduct = await CreateProduct({
      ...result.data,
      images,
    });

    fs.unlink(req.file.path, (err) => {
      if (err) console.error("❌ Error deleting local file:", err);
      else console.log("🧹 Local file deleted:", req.file.path);
    });

    return res
      .status(201)
      .json({ message: "Product created successfully", newProduct });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
}

async function GetProducts(req, res) {
  try {
    const AllProducts = await Product.find({});

    return res.json({
      AllProducts,
    });
  } catch (error) {
    return res.json({
      message: "Unable to get products",
      error: error.message,
    });
  }
}

async function GetProduct(req, res) {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        message: "No Product Found",
      });
    }

    return res.status(200).json({
      product,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Unable to get product",
      error: error.message,
    });
  }
}

async function DeleteProducts(req, res) {
  try {
    const AllProducts = await Product.deleteMany({});

    if (AllProducts.deletedCount === 0) {
      return res.status(404).json({ message: "No products found to delete." });
    }

    return res.status(200).json({
      message: "All products deleted successfully",
      result: AllProducts,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Unable to delete products",
      error: error.message,
    });
  }
}


async function DeleteProductById(req, res) {
  try {
    const { id } = req.params;

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.status(200).json({
      message: "Product deleted successfully",
      deletedProduct,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Unable to delete product",
      error: error.message,
    });
  }
}

module.exports = { Create, GetProducts, GetProduct,DeleteProducts,DeleteProductById };
