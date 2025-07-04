const express = require("express");
const router = express.Router();

const {saveCustomer, getAllCustomers, updateCustomer, deleteCustomer, getCustomerById} = require("../controllers/customer-controller");

router.post("/save", saveCustomer);
router.get("/get", getAllCustomers);
router.get("/get/:id", getCustomerById);
router.put("/update/:id", updateCustomer);
router.delete("/delete/:id", deleteCustomer);

module.exports = router;    


