const config = require('./config');
const jwt = require('jsonwebtoken');

const requestLogger = (request, response, next) => {
  console.log(`${request.method} ${request.url}`);
  next();
};

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === 'CastError') {
    return response.status(400).json({ error: error.message });
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({ error: 'invalid token' });
  }

  next(error);
};

const userExtractor = async (request, response, next) => {
  // Get auth header from request
  const authorization = request.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    token = authorization.replace('Bearer ', '');
    // Decode the token and extract user information
    const decodedToken = jwt.verify(token, config.jwtSecret);
    const user = await User.findById(decodedToken.id);
    // Attach the user to the request object
    request.user = user;
  }

  next();
};

module.exports = { requestLogger, errorHandler, userExtractor };