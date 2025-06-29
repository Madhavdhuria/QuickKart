import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Product from "./pages/product";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import Checkout from "./pages/Checkout";
import UserProtected from "./pages/UserProtected";
import PublicRoute from "./pages/PublicRoute";
import AdminProtected from "./components/AdminProtected";
import AdminDashBoard from "./pages/AdminDashBoard";
import AdminProducts from "./pages/AdminProducts";
import AdminOrders from "./pages/AdminOrders";
import AdminUsers from "./components/AdminUsers";
import AdminProductAdd from "./pages/AdminProductAdd";
import AdminProduct from "./components/AdminProduct";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<UserProtected />}>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/products" element={<Products />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/product/:id" element={<Product />} />
        </Route>

        <Route path="/admin" element={<AdminProtected />}>
          <Route path="dashboard" element={<AdminDashBoard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="products/create" element={<AdminProductAdd />} />
          <Route path="products/:id" element={<AdminProduct />} />
        </Route>

        <Route element={<PublicRoute />}>
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
