const jwt = require("jsonwebtoken");

const JWT_SECRET = "marketApi"; // use same key as when signing

exports.verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Authorization header missing" });
  }

  const token = authHeader.split(" ")[1]; // "Bearer <token>"

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // Attach decoded payload to request
    next(); // Continue
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
