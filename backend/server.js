const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

const UserRoutes = require("./Routes/UserRoutes");
// const OrderRoutes = require("./Routes/OrderRoutes");
// const ProductRoutes = require("./Routes/ProductRoutes");

dotenv.config();
connectDB();

const app = express();
app.use(express.json()); 

app.use("/api/user", UserRoutes);
// app.use("/api/order", OrderRoutes);
// app.use("/api/product", ProductRoutes);

app.get("/", (req, res) => {
  res.send("QuickKart API is live 🚀");
});

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
