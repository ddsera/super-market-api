const { MongoClient, ObjectId } = require("mongodb");
// or as an es module:
// import { MongoClient } from 'mongodb'

// Connection URL
const url = "mongodb://127.0.0.1:27017";
const client = new MongoClient(url);

const db = client.db("super-market");
const collection = db.collection("items");

const saveItem = async (req, res) => {
  const insertResult = await collection.insertOne(req.body);
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
