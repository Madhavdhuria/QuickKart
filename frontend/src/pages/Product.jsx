import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    async function GetProduct() {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/products/product/${id}`
        );
        setProduct(res.data.product);
      } catch (error) {
        console.error("Failed to fetch product", error);
      }
    }
    GetProduct();
  }, [id]);

  const handleDecrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleIncrease = () => {
    if (quantity < product.stock) setQuantity(quantity + 1);
  };

  const handleAddToCart = async () => {
  try {
    const token = localStorage.getItem("token");

    const res = await axios.post(
      "http://localhost:3000/api/cart/add",
      {
        productId: product._id,
        quantity,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("Cart updated:", res.data);
  } catch (err) {
    console.error("Failed to add to cart", err);
  }
};


  if (!product) {
    return <div className="text-center mt-10 text-lg">Loading product...</div>;
  }

  return (
    <>
      <Header />
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid md:grid-cols-2 gap-10">
          <div className="flex justify-center">
            <img
              src={product.images[0]?.url}
              alt={product.name}
              className="w-full max-w-md rounded-2xl shadow-md object-contain"
            />
          </div>

          <div className="space-y-6">
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <p className="text-gray-600 text-lg">{product.description}</p>

            <div className="text-2xl font-semibold text-green-600">
              ₹{product.price}
            </div>

            <div className="text-sm text-gray-500">
              <p>
                Category:{" "}
                <span className="text-gray-700">{product.category}</span>
              </p>
              <p>
                In Stock: <span className="text-gray-700">{product.stock}</span>
              </p>
            </div>

            <div className="flex items-center gap-4 mt-4">
              <span className="font-medium">Quantity:</span>
              <div className="flex items-center gap-2 border rounded-lg px-3 py-1">
                <button onClick={handleDecrease} className="text-xl px-2">
                  −
                </button>
                <span className="w-6 text-center">{quantity}</span>
                <button onClick={handleIncrease} className="text-xl px-2">
                  +
                </button>
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              className="mt-6 w-full md:w-auto px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
