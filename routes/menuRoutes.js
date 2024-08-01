const express =  require('express');
const router = express.Router();
const MenuItem = require('../models/MenuItem');

// POST method to send the MenuItem data
router.post('/', async (req, res) => {
  try {
    const data = req.body;   // Assuming the request body contains the person data.

    // Create a new MenuItem document using the Mongoose model.
    const newMenu = new MenuItem(data);

    // Save the new MenuItem to the database.
    const response = await newMenu.save();
    console.log('data saved');
    res.status(200).json(response);
  }
  catch(err) {
    console.log(err);
    res.status(500).json({error: 'Internal Server Error'});
  }
})

// GET method to get the MenuItem data
router.get('/', async (req, res) => {
  try {
    const data = await MenuItem.find();
    console.log('data fetched');
    res.status(200).json(data);
  }
  catch(err) {
    console.log(err);
    res.status(500).json({error: 'Internal Server Error'});
  }
})

// Parameterized URL
router.get('/:tasteType', async (req, res) => {
  try {
    const tasteType = req.params.tasteType;       // Extract the work type from the URL parameter

    if(tasteType == 'sweet' || tasteType == 'spice' || tasteType == 'sour' ) {
      const response = await MenuItem.find({taste: tasteType});
      console.log('response fetched');
      res.status(200).json(response);
    }
    else {
      res.status(404).json({error: 'Invalid taste type'})
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
    const menuId = req.params.id;       // Extract the id from the URL parameter.
    const updatedMenuData = req.body; // Update the data from the person.

    const response = await MenuItem.findByIdAndUpdate(menuId, updatedMenuData, {
      new: true,            // Return the updated statement
      runValidators: true,  // Run mongoose validator
    });

    if(!response) {
      return res.status(404).json({error: 'Menu Item not found'});
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
    const menuId = req.params.id;       // Extract the id from the URL parameter.

    // Assuming you have a Person model
    const response = await MenuItem.findByIdAndDelete(menuId);

    if(!response) {
      return res.status(404).json({error: 'Menu Item not found'});
    }

    console.log('data deleted');
    res.status(200).json({message: 'Menu Item Deleted succesfully'});
  }
  catch(err) {
    console.log(err);
    res.status(500).json({error: 'Internal Server Error'});
  }
})

// Exporting Router
module.exports = router;