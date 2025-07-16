const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/authMiddleware");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const {
  saveItem,
  getAllItems,
  updateItem,
  deleteItem,
  getItemById,
} = require("../controllers/items-controller");

// Set up multer storage
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

router.post("/saveItem", verifyToken, upload.single("image"), saveItem);
router.get("/get", verifyToken, getAllItems);
router.get("/get/:id", verifyToken, getItemById);
router.put("/update/:id", verifyToken, updateItem);
router.delete("/delete/:id", deleteItem);
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
