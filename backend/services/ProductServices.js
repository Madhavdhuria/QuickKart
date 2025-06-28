const Product = require("../models/ProductSchema");

async function CreateProduct(data) {
  console.log(data);
  const res = await Product.create(data);
  return res;
}

module.exports = { CreateProduct };