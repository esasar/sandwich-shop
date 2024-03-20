#!/usr/bin/env node
// Process tasks from the work queue
// in our case an order for a sandwich

'use strict';

const sendTask = require('./sendTask.js')

var amqp = require('amqplib');

/**
 * Generate a random number between min and max (inclusive)
 * 
 * @param {int} min minimum number (inclusive)
 * @param {int} max maximum number (inclusive)
 * @returns {int} random number between min and max
 */
const randomIntFromInterval = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

module.exports.getTask = function(rabbitHost, queueName){
  amqp.connect('amqp://' + rabbitHost).then(function(conn) {
    process.once('SIGINT', function() { conn.close(); });
    return conn.createChannel().then(function(ch) {
      var ok = ch.assertQueue(queueName, {durable: true});
      ok = ok.then(function() { ch.prefetch(1); });
      ok = ok.then(function() {
        ch.consume(queueName, doWork, {noAck: false});
        console.log(" [*] Waiting for messages. To exit press CTRL+C");
      });
      return ok;

      function doWork(msg) {
        var body = msg.content.toString();
        var order = JSON.parse(body);
        // Change order status to inQueue?
        console.log(" [x] Received '%s'", body);
        var secs = randomIntFromInterval(5, 10);
        console.log(" [x] Task takes %d seconds", secs);
        setTimeout(function() {
          console.log(" [x] Done");
          ch.ack(msg);
          // Change order status to ready
          order.status = "ready";
          sendTask.addTask("rapid-runner-rabbit", "message-queue-B", order);
        }, secs*1000);
      }
    });
  }).catch(console.warn);
}
