import PropTypes from 'prop-types'
import { useState } from 'react'

import Ingredient from './Ingredient'

import orderService from '../services/order'

const SandwichCard = ({ sandwich }) => {
  const [toggle, setToggle] = useState(false)
  
  const handleToggle = () => {
    setToggle(!toggle)
  }

  const handleOrder = () => {
    console.log(`Ordering ${sandwich.name}`)
    const order = {
      sandwichId: sandwich.id,
      status: "ordered"
    }
    console.log('Order:', order);
    const orderId = orderService.create(order)
      .then((newOrder) => {
        console.log(`Order placed!`, newOrder)

        // Updates order to the user's details.
        orderService.updateUser(newOrder.id)
          .then(() => {
            console.log('Order added to the user')
          })
      })
      .catch((err) => {
        console.error(err)
      })
  }

  const contentHeight = `${140 + sandwich.toppings.length * 23}px`;

  return (
    <div className='sandwichcard'>
      <h2 onClick={handleToggle}>{sandwich.name}</h2>
      <div className='sandwichcard__content' style={{height: toggle ? contentHeight : "0px"}}>
        <p>Bread: {sandwich.breadType}</p>
        <ul>
          {sandwich.toppings.map((ingredient, index) => (
            <Ingredient key={index} ingredient={ingredient}/>
          ))}
        </ul>
        <button onClick={handleOrder} className='addtoorderbutton'>Add to order</button>
      </div>
    </div>
  )
}

SandwichCard.propTypes = {
  sandwich: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    toppings: PropTypes.array.isRequired,
    breadType: PropTypes.string.isRequired
  }).isRequired
}

export default SandwichCard