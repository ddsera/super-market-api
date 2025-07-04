const express = require("express");
const app = express();
const port = 3000;

const customerRoutes = require("./routes/customer-routes");

// parse application/x-www-form-urlencoded
app.use(express.urlencoded());

// parse application/json
app.use(express.json());

app.use('/api/v1/customers', customerRoutes);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
