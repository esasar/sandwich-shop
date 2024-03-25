import { useState, useEffect } from "react"

import SandwichList from "./components/SandwichList"
import OrderList from "./components/OrderList"

import orderService from './services/order'

const sandwiches = [
  {
    name: "Ham and Cheese",
    ingredients: ["ham", "cheese"],
    sandwichId: 1
  },
  {
    name: "Club Sandwich",
    ingredients: ["ham", "turkey", "bacon", "lettuce", "tomato"],
    sandwichId: 2
  },
  {
    name: "Egg Salad",
    ingredients: ["egg", "mayo", "mustard"],
    sandwichId: 3
  }
]

const App = () => {
  const [orders, setOrders] = useState([]);

  // Polling orders every second, I know it's not the best solution
  // but at least it works for now
  useEffect(() => {
    const fetchOrders = async () => {
      const orders = await orderService.getAll()
      setOrders(orders)
    }
    fetchOrders()
    const intervalId = setInterval(fetchOrders, 1000)
    return () => clearInterval(intervalId)
  }, []);

  return (
    <div>
      <h1>&#129386; Ugly font sandwich shop &#129386;</h1>
      <SandwichList sandwiches={sandwiches} />
      <OrderList orders={orders} />
    </div>
  )
}

export default App