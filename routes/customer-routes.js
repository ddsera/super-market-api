const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/authMiddleware");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const {
  saveCustomer,
  getAllCustomers,
  updateCustomer,
  deleteCustomer,
  getCustomerById,
} = require("../controllers/customer-controller");

// Set up multer storage for customer images
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Save to uploads folder
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});
const upload = multer({ storage: storage });

// POST with image upload
router.post("/saveCustomer", verifyToken, upload.single("image"), saveCustomer);

router.post("/save", verifyToken, saveCustomer);
router.get("/get", verifyToken, getAllCustomers);
router.get("/get/:id", verifyToken, getCustomerById);
router.put("/update/:id", verifyToken, updateCustomer);
router.delete("/delete/:id", verifyToken, deleteCustomer);

// Serve customer images
router.get("/image/:filename", (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, "..", "uploads", filename);

  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      return res.status(404).json({ message: "Image not found" });
    }
    res.sendFile(filePath);
  });
});

module.exports = router;
