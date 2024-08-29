const jwt = require("jsonwebtoken");

// 1. jwtAuthMiddleware for Login
// JWT Authenticated Middleware: Wherever you want to apply authentication to the particular route then use this middleware on that route.
// In short, to make a particular route protected/authenticated, apply this middleware to that route so that, it will require the token to access that route.
const jwtAuthMiddleware = (req, res, next) => {
  // First check if the request header has authorization or not
  const authorization = req.headers.authorization;

  if (!authorization) {
    return res.status(401).json({ err: "Token not found" });
  }

  // Extract the jwt token from the request headers
  const token = req.headers.authorization.split(" ")[1];

  if (!token) {
    return res.status(401).json({ err: "Unauthorized" });
  }

  try {
    // verify() to verify that token in valid and not expired.
    // decoded variable stores the payload of the jwt token, which contains the user's information.
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user information to the request object
    req.user = decoded;
    next();
  } catch (err) {
    console.log(err);
    res.status(401).json({ error: "Invalid token" });
  }
};

// 2. generateToken for Signup
// Function to generate JWT token
const generateToken = (userData) => {
  // Generate a new token using user data
  return jwt.sign(userData, process.env.JWT_SECRET, { expiresIn: 30 });
};

module.exports = { jwtAuthMiddleware, generateToken };
