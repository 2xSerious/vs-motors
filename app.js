require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());
app.use("/clients", require("./routes/clientsRoutes"));
app.use("/suppliers", require("./routes/suppliersRoutes"));
app.use("/workers", require("./routes/workersRoutes"));
app.use("/vehicles", require("./routes/vehicleRoutes"));
app.use("/orders/", require("./routes/ordersRoutes"));
app.use("/parts", require("./routes/partsRoutes"));
app.use("/services", require("./routes/serviceRoutes"));

app.use((err, req, res, next) => {
  console.log(err.stack);
  console.log(err.name);
  console.log(err.code);

  res.status(500).json({
    message: "Something went wrong",
  });
});
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
