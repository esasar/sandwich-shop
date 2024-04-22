const url = 'http://localhost:8080/v1/order';

import userService from './user';

/**
 * Gets all orders for certain user from the backend.
 * 
 * @returns {Array<Order>} 
 */
const getAllOrders = async () => {
  const token = localStorage.getItem('token');

  const response = await fetch(`${url}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` // add the access token to the header
    }
  });

  // TODO: What happens if the request fails?
  const orders = await response.json();
  console.log(orders);

  return orders;
};

/**
 * Creates a new order
 * 
 * @param {Object} order 
 * @returns {Object} created order
 */
const createOrder = async (order) => {
  const token = localStorage.getItem('token');
  console.log(order);
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` // add the access token to the header
    },
    body: JSON.stringify(order)
  });

  // TODO: What happens if the request fails?
  const newOrder = await response.json();

  return newOrder;
};

export default { getAllOrders, createOrder };