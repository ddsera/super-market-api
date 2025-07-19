const express = require("express");
const path = require("path");
const app = express();
const port = 3000;

const customerRoutes = require("./routes/customer-routes");
const itemRoutes = require("./routes/item-routes");
const userRoutes = require("./routes/user_routes");

// parse application/x-www-form-urlencoded
app.use(express.urlencoded());

// parse application/json
app.use(express.json());

app.use("/api/v1/customers", customerRoutes);

app.use("/api/v1/items", itemRoutes);

app.use("/api/v1/users", userRoutes);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
