import Order from "./Order"
import PropTypes from "prop-types"
import { useState, useEffect } from "react";
import orderService from '../services/order';

const OrderList = () => {
  //const [userOrders, setUserOrders] = useState([]);
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);
  
  useEffect(() => {
      const fetchOrders = async () => {
        try {
          const orders = await orderService.getAllOrders();
          
          //const orders = await orderService.getAllOrders();
          //setOrders(orders);
          //setUserOrders(response.data.orders);
          //console.log(orders);

        // For each orderId in the array, fetching status information to be able to show them on orderlist.
        const orderlist = [];
        //orders.forEach(async item => {
        //  const order = await orderService.getOrderStatus(item);
        //  console.log("order information: ", order)
        //  orderlist.push(order);
        //});

        //setOrders(orderlist);
        //console.log(orderlist)
        } catch (error) {
          setError(error);
        }
      };

      //fetchUserOrders();
      // Polling for new order statuses.
      //const intervalId = setInterval(fetchUserOrders, 2000);
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