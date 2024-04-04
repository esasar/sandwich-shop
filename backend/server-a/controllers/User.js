'use strict';

const userRouter = require('express').Router();
var utils = require('../utils/writer.js');
var User = require('../models/user.js');

// TODO: Include API key when posting? 

// Password is not encrypted now and this could be added later.
// Creating a new user. If user with the same username already exists, gives an error.
userRouter.post('/', async (request, response) => {
  const body = request.body;

  // Should this check be done elsewhere?
  const user = await User.findOne({ username: body.username }, 
    { projection: { username: 1} });
  
  // Only creates a new user if user with the same username doesn't already exist.
  if (user != null) {
    const new_user = new User({
      username: body.username,
      email: body.email,
      password: body.password,
    });
  
    const savedUser = await new_user.save();
    response.json(savedUser);
  }
  else {
    // Not in the original sandwich API.
    response.status(400).json({ error: 'User with the chosen username already exists' });
  }
});

// TODO: Logging user in to the system.
// Checks if user with same username and password can be found in the system.
userRouter.post('/login', async (request, response) => {
  const body = request.body;
  const user = await User.findOne(
    {
    $and: [
      { username: body.username},
      { password: body.password},
    ]
  });

  if (user != null) {
    response.body('Successfull login');
    // TODO: log in to the system.
  }
  else {
    response.status(400).json({ error: 'Invalid username/password supplied' });
  }
});

// TODO: Logs out the current user.
userRouter.post('/logout', async (request, response) => {
  // TODO: logout.

});


module.exports = userRouter;
