import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import ProductCard from "../components/ProductCard";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/products/products", {
          withCredentials: true,
        });
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

  return (
    <>
      <Header />
      <div
        className="w-full h-[50vh] bg-cover bg-center relative"
        style={{ backgroundImage: `url('/your-banner.jpg')` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <h1 className="text-white text-3xl md:text-5xl font-bold">
            Welcome to QuickKart
          </h1>
        </div>
      </div>

      <div className="px-6 mt-6 mb-6">
        <h2 className="text-xl font-bold mb-4">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
          {products.length > 0 ? (
            products.map((product) => (
              <ProductCard
                key={product._id}
                id={product._id}
                image={product.images?.[0]?.url}
                name={product.name}
                description={product.description}
                price={product.price}
                stock={product.stock}
              />
            ))
          ) : (
            <p className="col-span-full text-gray-500">No products found.</p>
          )}
        </div>
      </div>

      <ToastContainer />
    </>
  );
};

export default Home;
