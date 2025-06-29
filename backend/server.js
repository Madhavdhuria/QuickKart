const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");

const UserRoutes = require("./Routes/UserRoutes");
const ProductRoutes = require("./Routes/ProductRoutes");
const OrderRoutes = require("./Routes/OrderRoutes");
const cartRoutes = require("./Routes/CartRoutes");

dotenv.config();
connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api/users", UserRoutes);
app.use("/api/products", ProductRoutes);
app.use("/api/orders", OrderRoutes);
app.use("/api/cart", cartRoutes);

app.get("/", (req, res) => {
  res.send("QuickKart API is live 🚀");
});

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
