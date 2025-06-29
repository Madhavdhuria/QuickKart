import axios from "axios";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [shippingInfo, setShippingInfo] = useState({
    fullName: "",
    addressLine: "",
    city: "",
    state: "",
    pincode: "",
    phone: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const navigate = useNavigate();

  const fetchCart = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:3000/api/cart", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const items = res.data.items || [];
      setItems(items);

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

  const handleChange = (e) => {
    setShippingInfo((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    const orderData = {
      user: "dummy",
      items: items.map((item) => ({
        product: item.productId._id,
        quantity: item.quantity,
      })),
      totalPrice: total,
      status: "pending",
      paymentMethod,
      shippingInfo,
    };

    try {
      await axios.post(
        "http://localhost:3000/api/orders/CreateOrder",
        orderData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      navigate("/orders");
    } catch (err) {
      console.error("Order failed", err);
      alert("Failed to place order.");
    }
  };

  return (
    <>
      <Header />
      <div className="max-w-3xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">Checkout</h1>
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <div className="space-y-2">
            {items.map((item) => (
              <div
                key={item._id}
                className="flex justify-between items-center border p-3 rounded"
              >
                <div>
                  <p className="font-medium">{item.productId.name}</p>
                  <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                </div>
                <p className="font-semibold text-green-700">
                  ₹{item.productId.price * item.quantity}
                </p>
              </div>
            ))}
          </div>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={shippingInfo.fullName}
              onChange={handleChange}
              className="border p-2 rounded"
              required
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={shippingInfo.phone}
              onChange={handleChange}
              className="border p-2 rounded"
              required
            />
            <input
              type="text"
              name="addressLine"
              placeholder="Address Line"
              value={shippingInfo.addressLine}
              onChange={handleChange}
              className="border p-2 rounded"
              required
            />
            <input
              type="text"
              name="city"
              placeholder="City"
              value={shippingInfo.city}
              onChange={handleChange}
              className="border p-2 rounded"
              required
            />
            <input
              type="text"
              name="state"
              placeholder="State"
              value={shippingInfo.state}
              onChange={handleChange}
              className="border p-2 rounded"
              required
            />
            <input
              type="text"
              name="pincode"
              placeholder="Pincode"
              value={shippingInfo.pincode}
              onChange={handleChange}
              className="border p-2 rounded"
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-2">Payment Method:</label>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="border p-2 rounded w-full"
              required
            >
              <option value="COD">Cash on Delivery</option>
              <option value="UPI">UPI</option>
              <option value="Card">Card</option>
            </select>
          </div>

          <div className="text-right mt-6">
            <p className="text-lg font-bold mb-4">Total: ₹{total}</p>
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold"
            >
              Confirm Order
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Checkout;
