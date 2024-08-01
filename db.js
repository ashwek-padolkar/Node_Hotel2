const mongoose = require('mongoose');
require('dotenv').config();

// Define the MongoDB connection URL
// 1. Online
// const mongoURL = process.env.MONGODB_URL;

// 2. Local
const mongoURL = process.env.MONGODB_URL_LOCAL;   // set the default mongodb url followed by database name 'hotels'.

// Setup MongoDB connection
mongoose.connect(mongoURL);

// Get the default connection
// Mongoose mantains a default connection object representing the MongoDb connection.
const db = mongoose.connection;

// Define Event Listeners on Connection object
// 1. Connected
db.on('connected', () => {
  console.log('Connected to MongoDb Server');
});

// 2. Error
db.on('error', (err) => {
  console.log('MongoDb Connection error: ', err);
});

// 3. Disconnection
db.on('disconnected', () => {
  console.log('MongoDB disconnected');
});

// Export the database connection
module.exports = db;
