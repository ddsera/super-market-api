const { MongoClient, ObjectId } = require("mongodb");
const bcrypt = require("bcrypt");

const url = "mongodb://127.0.0.1:27017";
const client = new MongoClient(url);

const db = client.db("super-market");
const collection = db.collection("users");

exports.registerUser = async (req, res) => {
    try {
      const { username, email, password } = req.body;
        
      // Check if user exists
      const existingUser = await collection.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }
  
      // Hash password
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
  
      // Create new user
      const newUser = {
        username,
        email,
        password: hashedPassword,
      };
  
      await collection.insertOne(newUser);
  
      res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  };

  
  exports.loginUser = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // 1. Find user by email
      const user = await collection.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }
  
      // 2. Compare password with hashed password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }
  
      // 3. Return success (or generate a token if using JWT)
      res.status(200).json({ message: 'Login successful', userId: user._id });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  };
  