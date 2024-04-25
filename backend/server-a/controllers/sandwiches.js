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

sandwichesRouter.post('/', async (request, response) => {
  if (!request.apiKeyValid) {
    return response.status(403).json({ error: 'Invalid/missing api key' });
  }

  const body = request.body;

  body.toppings = body.toppings.map(topping => new mongoose.Types.ObjectId(topping));

  const sandwich = new Sandwich({
    name: body.name,
    toppings: body.toppings,
    breadType: body.breadType,
    diet: body.diet
  });

  const savedSandwich = await sandwich.save();

  response.status(200).json(savedSandwich);
});

sandwichesRouter.post('/:id', async (request, response) => {
  const body = request.body;

  body.toppings = body.toppings.map(topping => new mongoose.Types.ObjectId(topping));

  const sandwich = {
    name: body.name,
    toppings: body.toppings,
    breadType: body.breadType,
    diet: body.diet
  };

  const updatedSandwich = await Sandwich.findByIdAndUpdate(request.params.id, sandwich, { new: true }).populate('toppings');

  if (!updatedSandwich) {
    response.status(400).json({ error: 'Invalid ID supplied' });
  }
  
  response.json(updatedSandwich);
});

sandwichesRouter.delete('/:id', async (request, response) => {
  if (!request.apiKeyValid) {
    response.status(403).json({ error: 'Invalid/missing api key' });
  } else {
    const he = await Sandwich.findByIdAndDelete(request.params.id);
    if (!he) {
      response.status(400).json({ error: 'Invalid ID supplied' });
    }
    response.status(204).end();
  }
});

module.exports = sandwichesRouter;