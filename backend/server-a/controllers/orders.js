const ordersRouter = require('express').Router();
const Order = require('../models/order.js');

const sendTask = require('../rabbit-utils/sendTask.js');

/**
 * Returns all of the orders.
 */
ordersRouter.get('/', async (request, response) => {
  // TODO: Not needed here? Doesn't work like this.
  //if (!request.user) {
  //  return response.status(401).json({ error: 'token missing or invalid' });
  //}
  
  const orders = await Order.find({});
  response.json(orders);
});

ordersRouter.get('/:id', async (request, response) => {
  if (!request.user) {
    return response.status(401).json({ error: 'token missing or invalid' });
  }

  const order = await Order.findById(request.params.id);

  if (!order) {
    response.status(404).json({ error: 'order not found' });
  } else if (order.user.toString() !== request.user._id.toString()) {
    response.status(401).json({ error: 'unauthorized' });
  } else {
    response.json(order);
  }
});

ordersRouter.post('/', async (request, response) => {
  if (!request.user) {
    return response.status(401).json({ error: 'token missing or invalid' });
  }

  const body = request.body;

  const order = new Order({
    sandwichId: body.sandwichId,
    status: body.status || 'ordered',
    userId: body.userId
  });

  const savedOrder = await order.save();
  // Send the order to the RabbitMQ queue
  sendTask.addTask("rapid-runner-rabbit", "message-queue-A", savedOrder);

  response.json(savedOrder);
});

module.exports = ordersRouter;