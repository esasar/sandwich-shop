const ordersRouter = require('express').Router();
const Order = require('../models/order.js');

const sendTask = require('../rabbit-utils/sendTask.js');

ordersRouter.get('/', async (request, response) => {
  const orders = await Order.find({});
  response.json(orders);
});

ordersRouter.get('/:id', async (request, response) => {
  const order = await Order.findById(request.params.id);
  if (!order) {
    response.status(404).json({ error: 'order not found' });
  } else {
    response.json(order);
  }
});

ordersRouter.post('/', async (request, response) => {
  // if (!request.user) { ... }; // Check for token, if we are to implement authentication

  const body = request.body;

  const order = new Order({
    sandwichId: body.sandwichId,
    status: body.status || 'ordered'
  });

  const savedOrder = await order.save();
  // Send the order to the RabbitMQ queue
  // sendTask.addTask("rapid-runner-rabbit", "message-queue-A", savedOrder);
  response.json(savedOrder);
});

module.exports = ordersRouter;