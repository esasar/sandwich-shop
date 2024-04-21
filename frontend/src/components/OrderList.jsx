import Order from "./Order"
import PropTypes from "prop-types"
import { useState, useEffect } from "react";
import orderService from '../services/order';

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);
  
  useEffect(() => {
      const fetchOrders = async () => {
        try {
          const orders = await orderService.getAll();
          setOrders(orders);
          console.log(orders);
        } catch (error) {
          setError(error);
        }
        
      };
      fetchOrders();
      const intervalId = setInterval(fetchOrders, 1000);
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