const express = require('express');
const app = express();
const db = require('./db');
require('dotenv').config();

// Middleware to parse JSON bodies
const bodyParser = require('body-parser');
app.use(bodyParser.json());                   // req.body
const PORT = process.env.PORT || 3000;

// Middleware function
const logRequest = (req, res, next) => {
  console.log(`[${(new Date().toLocaleString())}] Request made to: ${req.originalUrl}`);  
  next();       // Move on the next phase
}

app.use(logRequest);
app.get('/', function (req, res) {
  res.send('Welcome to Our Hotel')
})

// 1. Person Router
// Import the router files
const personRoutes = require('./routes/personRoutes');

// Use the router
app.use('/person', personRoutes);


// 2. Menu Router
// Import the router files
const menuRoutes = require('./routes/menuRoutes');

// Use the router
app.use('/menu', menuRoutes);

// Listening to Port
app.listen(3000, () => {
  console.log("Listening on port 3000");
})
