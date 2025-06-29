import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Pencil, Plus, Trash } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const AdminProducts = () => {
  const [Products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/api/products/products",
          {
            withCredentials: true,
          }
        );
        setProducts(res.data.AllProducts || []);
      } catch (error) {
        console.error("Error fetching products:", error.message);
        toast.error("Failed to fetch products. Please try again later.", {
          position: "top-right",
        });
      }
    };

    fetchProducts();
  }, []);
const navigate=useNavigate()
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">All Products</h2>
        <Link
          to="/admin/products/create"
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition text-sm font-medium"
        >
          <Plus size={18} onClick={()=>{
            navigate("/admin/products/add")
          }} /> Add Product
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Products.map((product) => (
          <div
            key={product._id}
            className="bg-white rounded-lg shadow border overflow-hidden flex flex-col"
          >
            <div className="w-full aspect-[4/3]">
              <img
                src={product.images[0]?.url}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4 flex flex-col flex-1">
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <p className="text-gray-600 text-sm">₹{product.price}</p>
              <p className="text-gray-500 text-sm">
                Category: {product.category}
              </p>
              <p className="text-gray-500 text-sm mb-3">
                Stock: {product.stock}
              </p>

              <div className="mt-auto flex gap-2">
                <button className="flex items-center gap-1 text-blue-600 hover:underline text-sm">
                  <Pencil size={16} /> Edit
                </button>
                <button className="flex items-center gap-1 text-red-600 hover:underline text-sm">
                  <Trash size={16} /> Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminProducts;
