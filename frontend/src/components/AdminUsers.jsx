import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);

  const fetchAllUsers = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get("http://localhost:3000/api/users/getAllusers", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });

      setUsers(res.data.users || []);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch users");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      const token = localStorage.getItem("token");

      await axios.delete(`http://localhost:3000/api/users/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });

      toast.success("User deleted successfully");
      setUsers(users.filter((user) => user._id !== id));
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Deletion failed");
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6">Registered Users</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {users.length === 0 ? (
          <p>No users found.</p>
        ) : (
          users.map((user) => (
            <div
              key={user._id}
              className="p-4 bg-white rounded-lg shadow border hover:shadow-md transition duration-200"
            >
              <h3 className="text-lg font-semibold">{user.name}</h3>
              <p className="text-sm text-gray-700">{user.email}</p>
              <p className="text-xs text-gray-500 mt-1">Role: {user.role}</p>
              <button
                onClick={() => handleDelete(user._id)}
                className="mt-3 px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700"
              >
                Delete User
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminUsers;
