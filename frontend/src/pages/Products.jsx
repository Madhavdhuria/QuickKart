import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import Header from "../components/Header";
import Filters from "../components/Filters";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("");
  const [maxPrice, setMaxPrice] = useState(50000);
  const [sortBy, setSortBy] = useState("");
  const [categories, setcategories] = useState([]);
  const [Search, setSearch] = useState("");

  useEffect(() => {
    const fetchFilteredProducts = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/api/products/products",
          {
            params: { category, maxPrice, sortBy, Search },
            withCredentials: true,
          }
        );
        setProducts(res.data.AllProducts || []);
      } catch (err) {
        console.error("Error fetching filtered products:", err.message);
        toast.error("Failed to fetch products. Please try again later.", {
          position: "top-right",
        });
      }
    };

    fetchFilteredProducts();
  }, [category, maxPrice, sortBy, Search]);

  useEffect(() => {
    const Fetchcategories = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/api/products/categories"
        );
        setcategories(res.data.categories || []);
      } catch (err) {
        console.error("Error fetching categories:", err.message);
        toast.error("Failed to fetch categories.", {
          position: "top-right",
        });
      }
    };

    Fetchcategories();
  }, []);

  return (
    <>
      <Header />
      <div className="flex flex-col xl:flex-row min-h-screen">
        <Filters
          category={category}
          setCategory={setCategory}
          maxPrice={maxPrice}
          setMaxPrice={setMaxPrice}
          sortBy={sortBy}
          setSortBy={setSortBy}
          categories={categories}
          Search={Search}
          setSearch={setSearch}
        />
        <div className="px-4 mt-4 lg:px-6 lg:mt-6 flex-1">
          <h2 className="text-xl lg:text-2xl font-bold mb-4">All Products</h2>
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
              <p className="text-gray-600 col-span-full">No products found.</p>
            )}
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Products;
