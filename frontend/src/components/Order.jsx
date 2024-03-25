import PropTypes from 'prop-types';

const Order = ({ order }) => {
  return (
    <li className='order'>
      Order {order.id} status: {order.status}
    </li>
  )
}

Order.propTypes = {
  order : PropTypes.shape({
    id: PropTypes.number.isRequired,
    sandwichId: PropTypes.number.isRequired,
    status: PropTypes.string.isRequired,
  }).isRequired
}

export default Order