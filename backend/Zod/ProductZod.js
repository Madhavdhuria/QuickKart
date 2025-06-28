const { z } = require("zod");

const ProductCreateSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  description: z.string().min(1, "Product description is required"),
  price: z.coerce.number().min(0, "Price must be positive"),     
  category: z.string().min(1, "Category is required"),
  stock: z.coerce.number().min(0, "Stock must be positive"),    
});

module.exports = { ProductCreateSchema };
