'use strict';

const Order = require('../models/order.js');

/**
 * Add an order for a sandwich
 * TODO: Since we are using mongo, the ID field is generated automatically
 * and the ID field is not required in the request body. It is however
 * in the api documentation, so I do not know if we can change it.
 * 
 * @param {Order} order place an order for a sandwich 
 * @returns {Promise<Order>}
 */
exports.addOrder = function(order) {
  return new Promise(function(resolve, reject) {
    const newOrder = new Order(order);
    
    newOrder.save()
      .then(() => {
        resolve(order);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

/**
 * Find an order by its ID
 * IDs must be positive integers
 * 
 * @param {int} orderId Long ID of the order that needs to be fetched 
 * @returns {Promise<Order>}
 */
exports.getOrderById = function(orderId) {
  return new Promise(function(resolve, reject) {
    Order.findOne({ id: orderId })
      .then(order => {
        resolve(order);
      })
      .catch((err) => {
        reject(err);
      });
  });
}


/**
 * Get a list of all orders. Empty array if no orders are found.
 *
 * @returns {Promise<Array<Order>}
 */
exports.getOrders = function() {
  return new Promise(function(resolve, reject) {
    Order.find({})
      .then(orders => {
        resolve(orders);
      })
      .catch((err) => {
        reject(err);
      });
  });
}