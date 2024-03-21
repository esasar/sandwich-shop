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

// Configure return object so that it matches the .yaml file
orderSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        delete returnedObject._id;
        delete returnedObject.__v;
        delete returnedObject.createdAt;
        delete returnedObject.updatedAt;
    }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;