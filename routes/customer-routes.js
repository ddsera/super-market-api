const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/authMiddleware");
const upload = require("../middleware/multer-config");
const path = require("path");
const fs = require("fs");

const {
  saveCustomer,
  getAllCustomers,
  updateCustomer,
  deleteCustomer,
  getCustomerById,
  updateCustomerImage,
} = require("../controllers/customer-controller");

// POST with image upload
router.post("/save", verifyToken, upload.single("image"), saveCustomer);
router.get("/get", verifyToken, getAllCustomers);
router.get("/get/:id", verifyToken, getCustomerById);
router.put("/update/:id", verifyToken, updateCustomer);
router.delete("/delete/:id", verifyToken, deleteCustomer);

// Update customer image
router.put(
  "/updateImage/:id",
  verifyToken,
  upload.single("image"),
  updateCustomerImage
);


module.exports = router;
