const sandwichesRouter = require('express').Router();
const Sandwich = require('../models/sandwich.js');
const mongoose = require('mongoose');

sandwichesRouter.get('/', async (request, response) => {
  const sandwiches = await Sandwich.find({}).populate('toppings');
  response.json(sandwiches);
});

sandwichesRouter.get('/:id', async (request, response) => {
  const sandwich = await Sandwich.findById(request.params.id).populate('toppings');
  if (!sandwich) {
    response.status(404).json({ error: 'sandwich not found' });
  } else {
    response.json(sandwich);
  }
});

// TODO: this does not work as specified
sandwichesRouter.post('/', async (request, response) => {
  // Posting should require an API key
  const body = request.body;

  body.toppings = body.toppings.map(topping => new mongoose.Types.ObjectId(topping));

  const sandwich = new Sandwich({
    name: body.name,
    toppings: body.toppings,
    breadType: body.breadType
  });

  const savedSandwich = await sandwich.save();
  response.json(savedSandwich);
});

sandwichesRouter.post('/:id', async (request, response) => {
  const body = request.body;

  body.toppings = body.toppings.map(topping => new mongoose.Types.ObjectId(topping));

  const sandwich = {
    name: body.name,
    toppings: body.toppings,
    breadType: body.breadType
  };

  const updatedSandwich = await Sandwich.findByIdAndUpdate(request.params.id, sandwich, { new: true }).populate('toppings');

  response.json(updatedSandwich);
});

// TODO: this does not work as specified
sandwichesRouter.delete('/:id', async (request, response) => {
  // Deleting should require an API key
  const he = await Sandwich.findByIdAndDelete(request.params.id);
  console.log(he);
  response.status(204).end();
});

module.exports = sandwichesRouter;