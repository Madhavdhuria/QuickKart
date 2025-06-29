import { useEffect, useState } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import axios from "axios";

const PublicRoute = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    if (!token) {
      setCheckingAuth(false);
      return;
    }

    async function CheckAuthentic() {
      try {
        await axios.get("http://localhost:3000/api/users/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });
        navigate("/");
      } catch (error) {
        console.log(error);
        localStorage.removeItem("token");
        setCheckingAuth(false);
      }
    }

    CheckAuthentic();
  }, [token, navigate]);

  if (checkingAuth) return null;
  return <Outlet />;
};

export default PublicRoute;
