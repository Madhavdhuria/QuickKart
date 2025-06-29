import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import Header from "../components/Header";
import Filters from "../components/Filters";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("");
  const [maxPrice, setMaxPrice] = useState(50000);
  const [sortBy, setSortBy] = useState("");
  const [categories, setcategories] = useState([]);

  useEffect(() => {
    const fetchFilteredProducts = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/api/products/products",
          {
            params: {
              category,
              maxPrice,
              sortBy,
            },
            withCredentials: true,
          }
        );
        setProducts(res.data.AllProducts || []);
      } catch (err) {
        console.error("Error fetching filtered products:", err.message);
      }
    };

    fetchFilteredProducts();
  }, [category, maxPrice, sortBy]);

  useEffect(() => {
    const Fetchcategories = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/api/products/categories"
        );
        setcategories(res.data.categories);
      } catch (err) {
        console.error("Error fetching filtered products:", err.message);
      }
    };
    Fetchcategories();
  }, []);

  return (
    <>
      <Header />
      <div className="flex min-h-screen">
        <Filters
          category={category}
          setCategory={setCategory}
          maxPrice={maxPrice}
          setMaxPrice={setMaxPrice}
          sortBy={sortBy}
          setSortBy={setSortBy}
          categories={categories}
        />
        <div className="px-6 mt-6 flex-1">
          <h2 className="text-2xl font-bold mb-4">All Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
            {products.map((product) => (
              <ProductCard
                key={product._id}
                id={product._id}
                image={product.images?.[0]?.url}
                name={product.name}
                description={product.description}
                price={product.price}
                stock={product.stock}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;
