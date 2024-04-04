'use strict';

const userRouter = require('express').Router();
var utils = require('../utils/writer.js');
var User = require('../models/user.js');

// TODO: Include API key when posting? 

// Password is not encrypted now and this could be added later.
// Creates a new user. If user with the same username already exists, gives an error. 
// Notice that this doesn't check if username, password and email are valid.
userRouter.post('/', async (request, response) => {
  const body = request.body;

  // Should this check be done elsewhere?
  const user = await User.findOne({ username: body.username });
  
  // Only creates a new user if user with the same username doesn't already exist.
  if (user == null) {
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

  if (user !== null) {
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

// Get user by username.
userRouter.get('/:username', async (request, response) => {
  // First checks if username is valid.
  if (!usernameIsValid(request.params.username)) {
    response.status(400).json({ error: 'Invalid username supplied' });
  }
  else {
    const user = await User.findOne({ username: request.params.username });

    if (user !== null) {
      response.json(user);
    }
    else {
      response.status(404).json({ error: 'User not found' });
    }
  }
});

// Updates username. This can only be done by the logged in user.
userRouter.put('/:username', async (request, response) => {
  // TODO: checks if user is logged in.

  // First checks if username is valid. 
  if (!usernameIsValid(request.params.username)) {
    response.status(400).json({ error: 'Invalid user supplied' });
  }
  else {
    const body = request.body;
    const user = await User.findOneAndUpdate({ username: body.username }, 
    { username: request.params.username });

    if ( user === null ) {
      response.status(404).json({ error: 'User not found' });
    }

    response.end();
  }
});

// Delete user. This can only be done by the logged in user.
userRouter.delete('/:username', async (request, response) => {
  // TODO: checks if user is logged in.
  // First checks if username is valid. 
  if (!usernameIsValid(request.params.username)) {
    response.status(400).json({ error: 'Invalid username supplied' });
  }
  else {
    const user = await User.findOneAndDelete({ username: request.params.username });

    if ( user === null ) {
      response.status(404).json({ error: 'User not found' });
    }

    response.end();
  }
});

// Function checks if username is valid. 
// Username can only consist of number, letter and _, ., - characters.
function usernameIsValid(username) {
  return /^[0-9a-zA-Z_.-]+$/.test(username);
}

module.exports = userRouter;
