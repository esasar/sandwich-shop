import Order from "./Order"
import PropTypes from "prop-types"

const SandwichList = ({ orders }) => {
  return (
    <div className='orderlist'>
      {orders.map((order) => (
        <Order key={order.id} order={order} />
      ))}
    </div>
  )
}

SandwichList.propTypes = {
  orders: PropTypes.array.isRequired,
}

export default SandwichList