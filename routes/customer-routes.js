const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/authMiddleware");

const {saveCustomer, getAllCustomers, updateCustomer, deleteCustomer, getCustomerById} = require("../controllers/customer-controller");


router.post("/save", verifyToken, saveCustomer);
router.get("/get", verifyToken, getAllCustomers);
router.get("/get/:id", verifyToken, getCustomerById);
router.put("/update/:id", verifyToken, updateCustomer);
router.delete("/delete/:id", verifyToken, deleteCustomer);

module.exports = router;    


