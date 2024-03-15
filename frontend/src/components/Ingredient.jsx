import PropTypes from 'prop-types'

const Ingredient = ({ ingredient }) => {
    return (
        <li className='ingredient'>
        <button>-</button>
        <button>+</button>
        {ingredient}
        </li>
    )
}

Ingredient.propTypes = {
    ingredient: PropTypes.string.isRequired
}

export default Ingredient

