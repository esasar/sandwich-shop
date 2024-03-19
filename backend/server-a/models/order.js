const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    id: {
        type: Number,
        required: true
    },
    sandwichId: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['ordered', 'received', 'inQueue', 'ready', 'failed'],
        default: 'ordered'
    }
}, {timestamps: true});

const Order = mongoose.model('Order',orderSchema);

module.exports = Order;