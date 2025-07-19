const { ObjectId } = require("mongodb");
const connectDB = require("../middleware/database");
const path = require("path");
const fs = require("fs");

let collection;

// Connect to the database and get the collection
connectDB()
  .then((db) => {
    collection = db.collection("customer");
  })
  .catch((err) => {
    console.error("Failed to connect to the database:", err);
    process.exit(1);
  });

const saveCustomer = async (req, res) => {
  // Combine form fields and image filename
  const customerData = {
    ...req.body,
    image: req.file ? req.file.filename : null,
  };

  const insertResult = await collection.insertOne(customerData);
  res.send(insertResult);
};
const getAllCustomers = async (req, res) => {
  const findResult = await collection.find({}).toArray();
  res.send(findResult);
};
const deleteCustomer = async (req, res) => {
  const deleteResult = await collection.deleteOne({
    _id: new ObjectId(req.params.id),
  });
  res.send(deleteResult);
};

const updateCustomer = async (req, res) => {
  const updateResult = await collection.updateOne(
    { _id: new ObjectId(req.params.id) },
    { $set: req.body }
  );
  res.send(updateResult);
};
const getCustomerById = async (req, res) => {
  const filteredDocs = await collection.findOne({
    _id: new ObjectId(req.params.id),
  });
  res.send(filteredDocs);
};

const updateCustomerImage = async (req, res) => {
  const { id } = req.params;
  const image = req.file ? req.file.filename : null;
  if (!image) {
    return res.status(400).json({ message: "No image uploaded" });
  }

  const customer = await collection.findOne({ _id: new ObjectId(id) });

  // Update the image field in MongoDB
  const updateResult = await collection.updateOne(
    { _id: new ObjectId(id) },
    { $set: { image } }
  );

  // Delete the old image file if it exists and is not null
  if (customer && customer.image) {
    const oldImagePath = path.join(__dirname, "..", "uploads", customer.image);
    fs.unlink(oldImagePath, (err) => {
      // Ignore error if file doesn't exist
    });
  }

  res.json({ message: "Image updated", updateResult, image });
};

module.exports = {
  saveCustomer,
  getAllCustomers,
  deleteCustomer,
  updateCustomer,
  getCustomerById,
  updateCustomerImage,
};
