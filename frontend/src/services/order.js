const url_order = 'http://localhost:8080/v1/order';
const url_user = 'http://localhost:8080/v1/user';

/**
 * Gets all orders from the backend
 * 
 * @returns {Array<Order>} 
 */
const getAll = async () => {
  const username = localStorage.getItem('username');
  const token = localStorage.getItem('token');

  const response = await fetch(url_user, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` // add the access token to the header
      } 
  });

  // TODO: What happens if the request fails?
  const orders = await response.json();

  return orders;
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

  console.log(orderId)

  const response = await fetch(`${url_user}?username=${username}/orderId=${orderId}`, {
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
      }
  });
  
  const updatedUser = await response.json();
  console.log(updatedUser);
};

export default { getAll, create, updateUser };