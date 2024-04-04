import { useState, useEffect } from "react";

import SandwichList from "./components/SandwichList";
import OrderList from "./components/OrderList";
import Login from "./components/Login";
import Register from "./components/Register";
import orderService from './services/order';

const App = () => {
  const [orders, setOrders] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoginMode, setIsLoginMode] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    const fetchOrders = async () => {
      const orders = await orderService.getAll();
      setOrders(orders);
    };
    fetchOrders();
    const intervalId = setInterval(fetchOrders, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleModeChange = () => {
    setIsLoginMode(!isLoginMode); // Toggle between login and registration mode
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    // redirect to the login page
    window.location.reload();
  }

  return (
    <div>
      <h1>&#129386; Ugly font sandwich shop &#129386;</h1>
      {!isLoggedIn && isLoginMode && <Login onLogin={handleLogin} />} 
      {!isLoggedIn && !isLoginMode && <Register onLogin={handleLogin} />} 
      {isLoggedIn && (
        <>
          <SandwichList />
          <OrderList orders={orders} />
          <button onClick={handleLogout} className="button-85"> logout </button>
        </>
      )}
      {!isLoggedIn && ( 
        <p>
          {isLoginMode
            ? "Don't have an account? "
            : "Already have an account? "}
          <button onClick={handleModeChange} className="button-85">
            {isLoginMode ? "Register" : "Login"}
          </button>
        </p>
      )}
    </div>
  );
};

export default App;
