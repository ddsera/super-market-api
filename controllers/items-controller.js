const { ObjectId } = require("mongodb");
const connectDB = require("../middleware/database");

let collection;

// Connect to the database and get the collection
connectDB()
  .then((db) => {
    collection = db.collection("items");
  })
  .catch((err) => {
    console.error("Failed to connect to the database:", err);
    process.exit(1);
  });

const saveItem = async (req, res) => {
  // Combine form fields and image filename
  const itemData = {
    ...req.body,
    image: req.file ? req.file.filename : null,
  };

  // Optionally, convert numeric fields (like price) to numbers
  if (itemData.price) itemData.price = Number(itemData.price);

  const insertResult = await collection.insertOne(itemData);
  res.send(insertResult);
};
const getAllItems = async (req, res) => {
  const findResult = await collection.find({}).toArray();
  res.send(findResult);
};

const deleteItem = async (req, res) => {
  const deleteResult = await collection.deleteOne({
    _id: new ObjectId(req.params.id),
  });
  res.send(deleteResult);
};
const updateItem = async (req, res) => {
  const updateResult = await collection.updateOne(
    { _id: new ObjectId(req.params.id) },
    { $set: req.body }
  );
  res.send(updateResult);
};
const getItemById = async (req, res) => {
  const filteredDocs = await collection.findOne({
    _id: new ObjectId(req.params.id),
  });
  res.send(filteredDocs);
};

module.exports = {
  saveItem,
  getAllItems,
  deleteItem,
  updateItem,
  getItemById,
};
