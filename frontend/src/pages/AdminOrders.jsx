import { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [statusMap, setStatusMap] = useState({});

  useEffect(() => {
    async function GetAllOrders() {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          "http://localhost:3000/api/orders/GetAllOrdersForAdmin",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          }
        );
        setOrders(res.data.orders);
        const initialMap = {};
        res.data.orders.forEach((o) => (initialMap[o._id] = o.status));
        setStatusMap(initialMap);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    }

    GetAllOrders();
  }, []);

  const handleStatusChange = (id, newStatus) => {
    setStatusMap((prev) => ({ ...prev, [id]: newStatus }));
  };

  const updateStatus = async (orderId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:3000/api/orders/updateOrderStatus/${orderId}`,
        { status: statusMap[orderId] },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      toast.success("Order status updated!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update status.");
    }
  };

  if (orders.length === 0) return <>No Orders</>;

  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
      {orders.map((order) => (
        <div
          key={order._id}
          className="border rounded-lg shadow-md p-4 bg-white space-y-2"
        >
          <p>
            <strong>Order ID:</strong> {order._id}
          </p>
          <p>
            <strong>User:</strong> {order.user?.userName?.firstName}{" "}
            {order.user?.userName?.lastName} ({order.user?.email})
          </p>
          <p>
            <strong>Total Price:</strong> ₹{order.totalPrice}
          </p>
          <p>
            <strong>Ordered On:</strong>{" "}
            {new Date(order.createdAt).toLocaleString()}
          </p>

          {order.shippingInfo && (
            <div className="bg-gray-100 p-2 rounded-md">
              <p className="font-semibold">Shipping Info:</p>
              <p>Name: {order.shippingInfo.fullName}</p>
              <p>
                Address: {order.shippingInfo.addressLine},{" "}
                {order.shippingInfo.city}, {order.shippingInfo.state} -{" "}
                {order.shippingInfo.pincode}
              </p>
              <p>Phone: {order.shippingInfo.phone}</p>
            </div>
          )}

          <div className="bg-gray-50 p-2 rounded-md">
            <p className="font-semibold">Products:</p>
            {order.items.map((item) => (
              <div
                key={item._id}
                className="flex items-center gap-4 border p-2 rounded-md my-1"
              >
                <img
                  src={item.product?.images?.[0]?.url}
                  alt={item.product?.name}
                  className="w-16 h-16 object-cover rounded"
                />
                <div>
                  <p className="font-medium">{item.product?.name}</p>
                  <p>Qty: {item.quantity}</p>
                  <p>Price: ₹{item.product?.price}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-2 flex items-center gap-2">
            {statusMap[order._id] !== "cancelled" && (
              <select
                value={statusMap[order._id]}
                onChange={(e) => handleStatusChange(order._id, e.target.value)}
                className="border rounded p-1"
              >
                <option value="pending">Pending</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
            )}
            {statusMap[order._id] !== "cancelled" && (
              <button
                onClick={() => updateStatus(order._id)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
              >
                Update
              </button>
            )}
           {statusMap[order._id] === 'cancelled' && <p className="text-red-900 text-2xl">Order Cancelled</p>}
          </div>
        </div>
      ))}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default AdminOrders;
