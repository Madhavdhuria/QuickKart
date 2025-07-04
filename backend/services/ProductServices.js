const Product = require("../models/ProductSchema");

async function CreateProduct(data) {
  const res = await Product.create(data);
  return res;
}


const extractPublicId = (url) => {
  console.log(url);
  
  const parts = url.split('/');
  const fileName = parts.pop().split('.')[0]; 
  const folder = parts.pop();
  return `${folder}/${fileName}`;
};

// https://res.cloudinary.com/dcskts1go/image/upload/v1751606856/QuickKart/hudjbuxkyrt4x29goygl.png

module.exports = { CreateProduct,extractPublicId };