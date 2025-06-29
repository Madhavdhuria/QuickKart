import axios from "axios";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import { Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);

  
  const fetchCart = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:3000/api/cart", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const items = res.data.items || [];
      setCartItems(items);

      const totalPrice = items.reduce(
        (acc, item) => acc + item.productId.price * item.quantity,
        0
      );
      setTotal(totalPrice);
    } catch (err) {
      console.error("Failed to fetch cart", err);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);
  
  const handleClearCart = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete("http://localhost:3000/api/cart/clear", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchCart();
    } catch (err) {
      console.error("Failed to clear cart", err);
    }
  };
  
  const handleRemove = async (productId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:3000/api/cart/remove/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchCart();
    } catch (err) {
      console.error("Failed to remove item", err);
    }
  };

  if (cartItems.length === 0) {
    return (
      <>
        <Header />
        <div className="text-center mt-10 text-lg">Your cart is empty.</div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="max-w-6xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

        <div className="grid gap-6">
          {cartItems.map((item) => {
            const product = item.productId;
            return (
              <div
                key={item._id}
                className="bg-white rounded-xl shadow-md p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
              >
                <div className="flex items-start gap-4 w-full">
                  <img
                    src={product.images[0]?.url}
                    alt={product.name}
                    className="w-28 h-28 object-cover rounded-lg border"
                  />
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold">{product.name}</h2>
                    <p className="text-gray-600 text-sm">
                      {product.description}
                    </p>
                    <p className="text-gray-500 text-sm mt-1">
                      Category: {product.category}
                    </p>
                  </div>
                </div>

                <div className="text-right md:text-left w-full md:w-auto">
                  <p className="text-lg font-bold text-green-700">
                    ₹{product.price}
                  </p>
                  <p className="text-sm">Qty: {item.quantity}</p>
                  <p className="text-sm text-gray-600 mt-1 mb-2">
                    Subtotal: ₹{product.price * item.quantity}
                  </p>

                  <div className="flex justify-end mt-2">
                    <button
                      onClick={() => handleRemove(product._id)}
                      className="text-red-500 hover:text-red-600 transition"
                      title="Remove from cart"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 text-right">
          <h2 className="text-xl font-bold">
            Total: <span className="text-green-700">₹{total}</span>
          </h2>
        </div>
        <div className="mt-6 text-right">
          <button
            onClick={() => navigate("/checkout")}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg"
          >
            Proceed to Checkout
          </button>
        </div>
        <div className="mt-4 text-right">
          <button
            onClick={handleClearCart}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-3 rounded-lg"
          >
            Clear Cart
          </button>
        </div>
      </div>
    </>
  );
};

export default Cart;
