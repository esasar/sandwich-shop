const url_order = 'http://localhost:8080/v1/order';
const url_user = 'http://localhost:8080/v1/user';

/**
 * Gets all orders for certain user from the backend.
 * 
 * @returns {Array<Order>} 
 */
const getAllOrders = async () => {
  const username = localStorage.getItem('username');
  const token = localStorage.getItem('token');

  const response = await fetch(`${url_user}/${username}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` // add the access token to the header
      } 
  });

  // TODO: What happens if the request fails?
  const orders = await response.json();

  //console.log(orders.orders);
  return orders.orders;
};

const getOrderStatus = async (orderId) => {
  //await Promise.all(orderArray.map(async (orderId) => {
    const content = await fetch(`${url_order}/${orderId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    console.log(content);
    
  return content;
};

/**
 * Creates a new order
 * 
 * @param {Object} order 
 * @returns {Object} created order
 */
const create = async (order) => {
  const token = localStorage.getItem('token');
  const response = await fetch(url_order, {
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

/**
 * Updates new order into user's own orders array.
 * 
 * @param {Object} orderId 
 */
const updateUser = async (orderId) => {
  const username = localStorage.getItem('username');
  const token = localStorage.getItem('token');

  const response = await fetch(`${url_user}/${username}/${orderId}`, {
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
      }
  });
  
  //const updatedUser = await response.json();
  console.log(response);
};

export default { getAllOrders, getOrderStatus, create, updateUser };