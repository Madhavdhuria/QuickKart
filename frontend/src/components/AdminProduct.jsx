import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`http://localhost:3000/api/products/product/${id}`);
        setFormData({
          name: data.product.name || "",
          description: data.product.description || "",
          price: data.product.price || "",
          category: data.product.category || "",
          stock: data.product.stock || "",
        });
      } catch (err) {
        toast.error("Failed to fetch product",err);
      }
    };
    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3000/api/products/update/${id}`, formData);
      toast.success("Product updated successfully!");
      setTimeout(() => {
        navigate("/admin/products");
      }, 1500);
    } catch (err) {
      toast.error("Update failed",err);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <ToastContainer position="top-right" autoClose={1500} />
      <h2 className="text-xl font-semibold mb-4">Edit Product</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="block font-medium mb-1">Product Name</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Product Name"
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Price</label>
          <input
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
            placeholder="Price"
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Category</label>
          <input
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="Category"
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Stock</label>
          <input
            name="stock"
            type="number"
            value={formData.stock}
            onChange={handleChange}
            placeholder="Stock"
            className="w-full border p-2 rounded"
          />
        </div>

        <button type="submit" className="bg-blue-600 text-white p-2 rounded">
          Update Product
        </button>
      </form>
    </div>
  );
};

export default AdminProduct;
