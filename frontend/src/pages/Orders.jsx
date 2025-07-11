import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import { toast, ToastContainer } from "react-toastify";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        "http://localhost:3000/api/orders/GetOrders",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.data.orders.length > 0) {
        toast.success("Orders loaded successfully");
      }
      setOrders(res.data.orders || []);
    } catch (err) {
      console.error("Failed to fetch orders", err);
      toast.error("Unable to load your orders. Please try again.");
    }
  };

  const handleCancelOrder = async (id) => {
    try {
      await axios.put(
        "http://localhost:3000/api/orders/CancelOrder",
        { id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          withCredentials: true,
        }
      );
      toast.success("Order cancelled successfully");
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Unable to update order");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (orders.length === 0) {
    return (
      <>
        <Header />
        <div className="text-center mt-10 text-lg">You have no orders yet.</div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="max-w-5xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold mb-6">Your Orders</h1>

        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="border rounded-lg p-4 shadow-md bg-white"
            >
              <div className="flex justify-between items-center mb-3">
                <p className="font-semibold">Order ID: {order._id}</p>
                <span
                  className={`text-sm font-medium px-3 py-1 rounded-full ${
                    order.status === "pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : order.status === "shipped"
                      ? "bg-blue-100 text-blue-700"
                      : order.status === "delivered"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {order.status}
                </span>
              </div>

              <div className="space-y-2 mb-3">
                {order.items.map((item) => (
                  <div
                    key={item._id}
                    className="flex justify-between text-sm text-gray-700"
                  >
                    <span>{item.product?.name || "Product Removed"}</span>
                    <span>Qty: {item.quantity}</span>
                    <span>₹{item.product?.price * item.quantity}</span>
                  </div>
                ))}
              </div>

              <div className="text-right text-green-700 font-semibold">
                Total: ₹{order.totalPrice}
              </div>

              <div className="text-sm text-gray-500 mt-1">
                Ordered on: {new Date(order.createdAt).toLocaleString()}
              </div>
              {order.status !== "cancelled" && order.status!=='delivered'
               && (
                <button
                  type="button"
                  className="focus:outline-none my-2 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                  onClick={() => {
                    handleCancelOrder(order._id);
                  }}
                >
                  cancel order
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
};

export default Orders;
