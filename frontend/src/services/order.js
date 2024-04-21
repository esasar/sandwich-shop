const url = 'http://localhost:8080/v1/order';

/**
 * Gets all orders from the backend
 * 
 * @returns {Array<Order>} 
 */
const getAll = async () => {
    const token = localStorage.getItem('token');
    const response = await fetch(url, {
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

export default { getAll, create };