import axios from "axios";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AdminHeader from "./AdminHeader";

const AdminProtected = () => {
  const navigate = useNavigate();
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    const checkAdmin = async () => {
      const token = localStorage.getItem("token");
      if (!token) return navigate("/signin");

      try {
        const res = await axios.get("http://localhost:3000/api/users/isAdmin", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });

        if (res.status === 200 && res.data?.user?.role === "admin") {
          setIsVerified(true);
        } else {
          toast.error("Access Denied: Admins only");
          navigate("/signin");
        }
      } catch (error) {
        console.log(error);
        toast.error("Access Denied: Admins only");
        navigate("/signin");
      }
    };

    checkAdmin();
  }, [navigate]);

  return isVerified ? (
    <>
      <AdminHeader />
      <Outlet />
    </>
  ) : null;
};

export default AdminProtected;
