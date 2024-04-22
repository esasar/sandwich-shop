const url = 'http://localhost:8080/v1/sandwich';

const getAllSandwiches = async () => {
  const response = await fetch(`${url}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  const orders = await response.json();

  return orders;
};

const getSandwich = async (id) => {
  const response = await fetch(`${url}/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  const sandwich = await response.json();

  return sandwich;
};

export default { getAllSandwiches, getSandwich };