import { Link, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  FileText,
  Users,
  LogOut,
  Home,
} from "lucide-react";

const AdminHeader = () => {
  const navigate = useNavigate();
  return (
    <header className="w-full bg-gray-900 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/admin/dashboard" className="text-xl font-bold text-white">
          Admin Panel
        </Link>

        {/* Navigation */}
        <nav className="space-x-4 flex items-center text-sm font-medium">
          <Link to="/" className="flex items-center gap-2 hover:text-gray-300">
            <Home size={18} />
            <span className="hidden md:inline">Home</span>
          </Link>
          <Link
            to="/admin/products"
            className="flex items-center gap-2 hover:text-gray-300"
          >
            <Package size={18} />
            <span className="hidden md:inline">Products</span>
          </Link>
          <Link
            to="/admin/orders"
            className="flex items-center gap-2 hover:text-gray-300"
          >
            <FileText size={18} />
            <span className="hidden md:inline">Orders</span>
          </Link>
          <Link
            to="/admin/users"
            className="flex items-center gap-2 hover:text-gray-300"
          >
            <Users size={18} />
            <span className="hidden md:inline">Users</span>
          </Link>
        </nav>

        {/* Logout */}
        <div className="flex items-center">
          <button
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-sm px-3 py-1 rounded"
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/signin");
            }}
          >
            <LogOut size={18} />
            <span className="hidden md:inline">Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
