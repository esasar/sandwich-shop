import PropTypes from 'prop-types'
import { useState } from 'react'

import Ingredient from './Ingredient'

import orderService from '../services/order'

const SandwichCard = ({ sandwich }) => {
  const [toggle, setToggle] = useState(false)
  
  const handleToggle = () => {
    setToggle(!toggle)
  }

  // TODO: this is just a mock implementation
  const handleOrder = () => {
    console.log(`Ordering ${sandwich.name}`)
    const mockOrder = {
      id: Math.floor(Math.random() * 1000) + 1,
      sandwichId: sandwich.sandwichId,
      status: "ordered"
    }
    orderService.create(mockOrder)
      .then(() => {
        console.log(`Order placed!`)
      })
      .catch((err) => {
        console.error(err)
      })
  }

  const contentHeight = `${100 + sandwich.toppings.length * 23}px`;

  return (
    <div className='sandwichcard'>
      <h2 onClick={handleToggle}>{sandwich.name}</h2>
      <h2 onClick={handleToggle}>bread type: {sandwich.breadType}</h2>
      <div className='sandwichcard__content' style={{height: toggle ? contentHeight : "0px"}}>
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
    name: PropTypes.string.isRequired,
    toppings: PropTypes.array.isRequired
  }).isRequired
}

export default SandwichCard