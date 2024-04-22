import Order from "./Order"
import PropTypes from "prop-types"
import { useState, useEffect } from "react"
import orderService from '../services/order'
import userService from '../services/user';

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(null);
  
  useEffect(() => {
    // Doesn't fetch userId, TODO
    const fetchUser = async () => {
      const user = await userService.getUser();
      console.log("testi", user._id)
      setUserId(user._id);
    };

    const fetchOrders = async () => {
      try {
        const orders = await orderService.getAllOrders();
        console.log(userId);
        if (userId !== null) {
          const filtered_orders = orders.filter((order) => order.userId === userId);
          setOrders(filtered_orders);
        }
      } catch (error) {
        setError(error);
      }
    };

    fetchUser();
    fetchOrders();
    // Polling for new order status.
    const intervalId = setInterval(fetchOrders, 2000);
  }, [])

  return (
    <div className='orderlist'>
      {orders.map((order) => (
        <Order key={order.id} order={order} />
    ))}
    </div>
  )
}

OrderList.propTypes = {
  orders: PropTypes.array.isRequired,
}

export default OrderList