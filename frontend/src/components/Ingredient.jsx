import PropTypes from 'prop-types'
import { useState } from 'react';

const Ingredient = ({ ingredient }) => {
    const[count, setCount] = useState(0);
    return (
        <li className='ingredient'>
        {count > 0 && <>{count}</>}
        <button onClick={() => count > 0 && setCount(count - 1)}>-</button>
        <button onClick={()=>setCount(count + 1)}>+</button>
        {ingredient.name}
        </li>
    )
}

Ingredient.propTypes = {
    ingredient: PropTypes.string.isRequired
}

export default Ingredient

