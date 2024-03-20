#!/usr/bin/env node
// Process tasks from the work queue

'use strict';

const changeOrderStatus = require('../service/OrderService.js').changeOrderStatus;

var amqp = require('amqplib');

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
        console.log(" [x] Received '%s'", body);
        setTimeout(function() {
          console.log(" [x] Done");
          ch.ack(msg);
          // TODO: Change order status to "completed" here?
        }, 0);
      }
    });
  }).catch(console.warn);
}
