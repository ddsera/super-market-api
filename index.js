const express = require("express");
const app = express();
const port = 3000;

const customerRoutes = require("./routes/customer-routes");
const itemRoutes = require("./routes/item-routes");
const userRoutes = require("./routes/user_routes");
const uploadRoutes = require("./routes/uploadss-routes");


// parse application/x-www-form-urlencoded
app.use(express.urlencoded());

// parse application/json
app.use(express.json());

app.use('/api/v1/customers', customerRoutes);

app.use('/api/v1/items', itemRoutes);

app.use('/api/v1/users', userRoutes);

app.use('/api/v1/uploads', uploadRoutes);




app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
