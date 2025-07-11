import { Link, useNavigate } from "react-router-dom";
import {
  ShoppingCart,
  LogOut,
  LayoutGrid,
  PackageCheck,
  ShieldCheck,
} from "lucide-react";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";

const Header = () => {
  const [admin, setadmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function isAdmin() {
      try {
        await axios.get("http://localhost:3000/api/users/isAdmin", {
          headers: { Authorization: `bearer ${localStorage.getItem("token")}` },
          withCredentials: true,
        });
        setadmin(true);
      } catch (error) {
        console.log(error);
      }
    }

    isAdmin();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/signin");
  };

  console.log(admin);

  return (
    <header className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
      <div className="flex items-center gap-2">
        <h1 className="text-2xl font-extrabold text-gray-600 tracking-wide">
          <Link to="/" className="hover:text-blue-800 transition duration-200">
            QuickKart
          </Link>
        </h1>
        {admin && (
          <Link
            to="/admin/dashboard"
            className="flex items-center gap-1 text-gray-700 hover:text-blue-600"
          >
            <ShieldCheck className="w-5 h-5" />
            <span className="hidden sm:inline text-sm font-medium">Admin</span>
          </Link>
        )}
      </div>

      <nav className="flex items-center gap-6">
        <Link
          to="/products"
          className="flex items-center gap-1 text-gray-700 hover:text-blue-600"
        >
          <LayoutGrid className="w-5 h-5" />
          <span className="hidden sm:inline text-sm font-medium">
            All Products
          </span>
        </Link>

        <Link
          to="/orders"
          className="flex items-center gap-1 text-gray-700 hover:text-blue-600"
        >
          <PackageCheck className="w-5 h-5" />
          <span className="hidden sm:inline text-sm font-medium">
            Your Orders
          </span>
        </Link>

        <Link
          to="/cart"
          className="flex items-center gap-1 text-gray-700 hover:text-blue-600"
        >
          <ShoppingCart className="w-5 h-5" />
          <span className="hidden sm:inline text-sm font-medium">Cart</span>
        </Link>

        <button
          onClick={handleLogout}
          className="flex items-center gap-1 text-red-600 hover:text-red-700"
        >
          <LogOut className="w-5 h-5" />
          <span className="hidden sm:inline text-sm font-medium">Logout</span>
        </button>
      </nav>
    </header>
  );
};

export default Header;
