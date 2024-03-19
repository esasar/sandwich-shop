const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// mongoose model for Topping
const toppingSchema = new Schema({
    id: {
      type: Number,
      required: true,
      unique: true
    },
    name: {
      type: String,
      required: true
    }
  });
  
  const Topping = mongoose.model('Topping', toppingSchema);
  
  // mongoose model for sandwich
  const sandwichSchema = new Schema({
    id: {
      type: Number,
      required: true,
      unique: true
    },
    name: {
      type: String,
      required: true,
    },
    toppings: [{
      type: Schema.Types.ObjectId,
      ref: 'Topping'
    }],
    breadType: {
      type: String,
      enum: ['oat', 'rye', 'wheat'],
      required: true
    }
  });
  
  const Sandwich = mongoose.model('Sandwich', sandwichSchema);
  
  module.exports = { Sandwich, Topping };