const express = require("express");
const router = express.Router();

const {saveItem, getAllItems, updateItem, deleteItem, getItemById} = require("../controllers/items-controller");

router.post("/save", saveItem);
router.get("/get", getAllItems);
router.get("/get/:id", getItemById);
router.put("/update/:id", updateItem);
router.delete("/delete/:id", deleteItem);

module.exports = router;  