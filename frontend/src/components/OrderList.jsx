import Order from "./Order"
import PropTypes from "prop-types"
import { useState, useEffect } from "react"
import orderService from '../services/order'
import userService from '../services/user';
import order from "../services/order";

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(null);
  
  useEffect(() => {
    const fetchOrders = async () => {
      const orders = await orderService.getAllOrders();
      setOrders(orders);
    };

    fetchOrders();
    const intervalId = setInterval(fetchOrders, 2000);
    return () => clearInterval(intervalId);
  }, [])

  return (
    <div className='orderlist'>
      {orders && orders.map((order) => (
        <Order key={order.id} order={order} />
    ))}
    </div>
  )
}

OrderList.propTypes = {
  orders: PropTypes.array.isRequired,
}

export default OrderList