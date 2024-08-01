const express = require('express')    // Import the Express library.
const app = express()                 // Create an instance of an Express application.

// get() method:
// 1st parameter: Define a route for the root URL ('/')
// 2nd parameter: sends the response to the client as 'Welcom..'.
app.get('/', function (req, res) {
  res.send('Welcome to my hotel... How may I help you?')
})

app.get('/chicken', function (req, res) {
  res.send('Sure Sir... I would love to serve chicken.')
})

app.get('/idli', function (req, res) {
  var customizedIdli = {
    name: 'rava idli',
    size: '10cm diameter',
    isSambhar: true,
    isChatni: false
  }
  res.send(customizedIdli);
})

app.post('/items', function (req, res) {
  console.log("data is received by the server");
  res.send("data is saved!!!");
})

app.listen(3000, () => {    // Make the application listen on port 3000 for incoming requests.
  console.log("Listening on port 3000");
})