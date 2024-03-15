import SandwichCard from "./SandwichCard"
import PropTypes from "prop-types"

const SandwichList = ({ sandwiches }) => {
  return (
    <div className='sandwichlist'>
      {sandwiches.map((sandwich, index) => (
        <SandwichCard key={index} sandwich={sandwich} />
      ))}
    </div>
  )
}

SandwichList.propTypes = {
  sandwiches: PropTypes.array.isRequired,
}

export default SandwichList