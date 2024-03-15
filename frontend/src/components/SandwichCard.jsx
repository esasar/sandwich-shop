import PropTypes from 'prop-types'
import { useState } from 'react'

import Ingredient from './Ingredient'

const SandwichCard = ({ sandwich }) => {
  const [toggle, setToggle] = useState(false)
  
  const handleToggle = () => {
    setToggle(!toggle)
  }

  const contentHeight = `${100 + sandwich.ingredients.length * 23}px`;

  return (
    <div className='sandwichcard'>
      <h2 onClick={handleToggle}>{sandwich.name}</h2>
      <div className='sandwichcard__content' style={{height: toggle ? contentHeight : "0px"}}>
        <ul>
          {sandwich.ingredients.map((ingredient, index) => (
            <Ingredient key={index} ingredient={ingredient} />
          ))}
        </ul>
        <button className='addtoorderbutton'>Add to order</button>
      </div>
    </div>
  )
}

SandwichCard.propTypes = {
  sandwich: PropTypes.shape({
    name: PropTypes.string.isRequired,
    ingredients: PropTypes.array.isRequired
  }).isRequired
}

export default SandwichCard