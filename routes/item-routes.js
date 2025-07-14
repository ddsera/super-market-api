const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/authMiddleware");

const {saveItem, getAllItems, updateItem, deleteItem, getItemById} = require("../controllers/items-controller");


router.post("/save", verifyToken, saveItem);
router.get("/get", verifyToken, getAllItems);
router.get("/get/:id", verifyToken, getItemById);
router.put("/update/:id", verifyToken, updateItem);
router.delete("/delete/:id", deleteItem);

module.exports = router;  