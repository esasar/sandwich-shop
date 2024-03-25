#!/usr/bin/env node
// Post a new task to the work queue
// in our case an order for a sandwich

'use strict';

var amqp = require('amqplib');
const orderService = require('../service/OrderService.js');

module.exports.addTask = function(rabbitHost, queueName, order){
  amqp.connect('amqp://' + rabbitHost)
  .then(function(c) {
    c.createConfirmChannel()
    .then(function(ch) {
      ch.sendToQueue(queueName, new Buffer.from(JSON.stringify(order)), {},
      function(err, ok) {
        if (err !== null) {
          console.warn(new Date(), 'Message nacked!');
          // Change order status to "failed"
          orderService.updateOrder(
            order.id,
            { status: "failed" }
          )
        }
        else {
          console.log(new Date(), 'Message acked');
          // Change order status to "inQueue"
          orderService.updateOrder(
            order.id,
            { status: "inQueue" }
          )
        }
      });
    });
  });
}
