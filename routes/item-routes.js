const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/authMiddleware");
const upload = require("../middleware/multer-config");
const path = require("path");
const fs = require("fs");

const {
  saveItem,
  getAllItems,
  updateItem,
  deleteItem,
  getItemById,
} = require("../controllers/items-controller");

router.post("/saveItem", verifyToken, upload.single("image"), saveItem);
router.get("/get", verifyToken, getAllItems);
router.get("/get/:id", verifyToken, getItemById);
router.put("/update/:id", verifyToken, updateItem);
router.delete("/delete/:id", verifyToken, deleteItem);

module.exports = router;
