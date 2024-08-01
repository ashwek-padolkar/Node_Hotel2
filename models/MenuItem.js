const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  taste: {
    type: String,
    enum: ['sweet', 'spice', 'sour'],
    required: true
  },
  is_drinks: {
    type: Boolean,
    default: false
  },
  ingredients: {
    type: [String],
    default: []
  },
  num_sales: {
    type: Number,
    default: 0
  }
})

// Create Menu model
const MenuItem = mongoose.model('MenuItem', menuItemSchema);
module.exports = MenuItem;
