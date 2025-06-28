const { ProductCreateSchema } = require("../Zod/ProductZod");
const cloudinary = require("../utils/cloudinary");
const { CreateProduct } = require("../services/ProductServices");
const fs = require("fs");

async function Create(req, res) {
  try {
    const result = ProductCreateSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ error: result.error.format() });
    }

    const cloudRes = await cloudinary.uploader.upload(req.file.path, {
      folder: "QuickKart",
    });

    const newProduct = await CreateProduct({
      ...result.data,
      url: cloudRes.secure_url,
    });

    fs.unlink(req.file.path, (err) => {
      if (err) console.error("❌ Error deleting local file:", err);
      else console.log("🧹 Local file deleted:", req.file.path);
    });

    console.log(newProduct);
    return res
      .status(201)
      .json({ message: "Product created successfully", newProduct });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
}

module.exports = { Create };
