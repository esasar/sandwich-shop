const url = 'http://localhost:8080/v1/user';

const getUser = async () => {
    const username = localStorage.getItem('username');
    const token = localStorage.getItem('token');
  
    const response = await fetch(`${url}/${username}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` // add the access token to the header
      }
    });
    const user = await response.json();
    return user;
  };

  export default { getUser };