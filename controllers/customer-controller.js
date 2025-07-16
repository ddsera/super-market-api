const { MongoClient, ObjectId } = require("mongodb");
const { verifyToken } = require("../middleware/authMiddleware");
// or as an es module:
// import { MongoClient } from 'mongodb'

// Connection URL
const url = "mongodb://127.0.0.1:27017";
const client = new MongoClient(url);

const db = client.db("super-market");
const collection = db.collection("customer");

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

module.exports = {
  saveCustomer,
  getAllCustomers,
  deleteCustomer,
  updateCustomer,
  getCustomerById,
};
