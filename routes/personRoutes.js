const express =  require('express');
const router = express.Router();
const Person = require('../models/Person');
const {jwtAuthMiddleware, generateToken} = require('../jwt');

// POST method to send the person data
router.post('/signup', async (req, res) => {
  try {
    const data = req.body;   // Assuming the request body contains the person data.

    // Create a new Person document using the Mongoose model.
    const newPerson = new Person(data);

    // Save the new person to the database.
    const response = await newPerson.save();
    console.log('data saved');

    const payload = {
      id: response.id,
      username: response.username
    }

    console.log(JSON.stringify(payload));
    const token = generateToken(payload);
    console.log("Token is :", token);

    res.status(200).json({ response: response, token: token });
  }
  catch(err) {
    console.log(err);
    res.status(500).json({error: 'Internal Server Error'});
  }
})

// Login Route
router.post('/login', async(req, res) => {
  try{
    // Extract username and password from request body
    const {username, password} = req.body;

    // Find the user by username
    const user = await Person.findOne({username: username});

    // If user does not exists or password does not match, return error
    if(!user || !(await user.comparePassword(password))) {
      return res.status(401).json( {error: 'Invalid username and password'} );
    }

    // generate Token
    const payload = {
      id : user.id,
      username : user.username
    }

    const token = generateToken(payload);

    // return token as response
    res.json({ token });
  }
  catch(err) {
    console.log(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
})

// Profile Route
router.get('/profile', jwtAuthMiddleware, async (req, res) => {
  try {
    const userData = req.user;
    console.log("User data: ", userData);

    const userId = userData.id;
    const user = await Person.findById(userId);

    res.status(200).json({user});
  }
  catch(err) {
    console.log(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
})

// GET method to get the person data
router.get('/', jwtAuthMiddleware, async (req, res) => {
  try {
    const data = await Person.find();
    console.log('data fetched');
    res.status(200).json(data);
  }
  catch(err) {
    console.log(err);
    res.status(500).json({error: 'Internal Server Error'});
  }
})

// Parameterized URL
router.get('/:workType', async (req, res) => {
  try {
    const workType = req.params.workType;       // Extract the work type from the URL parameter

    if(workType == 'chef' || workType == 'manager' || workType == 'waiter' ) {
      const response = await Person.find({work: workType});
      console.log('response fetched');
      res.status(200).json(response);
    }
    else {
      res.status(404).json({error: 'Invalid work type'})
    }
  }
  catch {
    console.log(err);
    res.status(500).json({error: 'Internal Server Error'});
  }
})

// Update Operation
router.put('/:id', async (req, res) => {
  try {
    const personId = req.params.id;       // Extract the id from the URL parameter.
    const updatedPersonData = req.body; // Update the data from the person.

    const response = await Person.findByIdAndUpdate(personId, updatedPersonData, {
      new: true,            // Return the updated statement
      runValidators: true,  // Run mongoose validator
    });

    if(!response) {
      return res.status(404).json({error: 'Person not found'});
    }

    console.log('data updated');
    res.status(200).json(response);
  }
  catch(err) {
    console.log(err);
    res.status(500).json({error: 'Internal Server Error'});
  }
})

// Delete Opeation
router.delete('/:id', async (req, res) => {
  try {
    const personId = req.params.id;       // Extract the id from the URL parameter.

    // Assuming you have a Person model
    const response = await Person.findByIdAndDelete(personId);

    if(!response) {
      return res.status(404).json({error: 'Person not found'});
    }

    console.log('data deleted');
    res.status(200).json({message: 'Person Deleted succesfully'});
  }
  catch(err) {
    console.log(err);
    res.status(500).json({error: 'Internal Server Error'});
  }
})

module.exports = router;