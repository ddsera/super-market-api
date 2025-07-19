const { MongoClient } = require("mongodb");

const url = "mongodb://127.0.0.1:27017";
const client = new MongoClient(url);

const dbName = "super-market";
let db;

const connectDB = async () => {
  if (db) return db;
  try {
    await client.connect();
    console.log("Connected to MongoDB");
    db = client.db(dbName);
    return db;
  } catch (err) {
    console.error("Failed to connect to MongoDB", err);
    process.exit(1);
  }
};

module.exports = connectDB;
