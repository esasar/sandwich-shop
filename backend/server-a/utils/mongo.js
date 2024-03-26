const mongoose = require('mongoose');
const config = require('./config.js');

const Order = require('../models/order.js');
const User = require('../models/user.js');
const Topping = require('../models/topping.js');
const Sandwich = require('../models/sandwich.js');

const connectToDb = async () => {
  console.log(`connecting to MongoDB at ${config.dbUri}`);
  try {
    await mongoose.connect(config.dbUri);
    seedDb();
    console.log('connected to MongoDB');
  } catch (error) {
    console.error('error connecting to MongoDB:', error.message);
  }
};

const seedDb = async () => {
  try {
    await mongoose.connection.dropDatabase();

    const exampleUsers = [
      {
        username: 'alice',
        password: 'password',
        email: 'alice@email.com',
      },
      {
        username: 'bob',
        password: 'password',
        email: 'bob@othermail.com',
      },
    ];

    const userPromises = exampleUsers.map(async (user) => {
      const newUser = new User(user);
      await newUser.save();
    });

    await Promise.all(userPromises);

    const exampleToppings = [
      {
        name: 'lettuce',
      },
      {
        name: 'tomato',
      },
      {
        name: 'cucumber',
      },
    ];

    const toppingPromises = exampleToppings.map(async (topping) => {
      const newTopping = new Topping(topping);
      await newTopping.save();
    });

    await Promise.all(toppingPromises);

    const exampleSandwiches = [
      {
        name: 'Lettuce and tomato',
        toppings: [
          await Topping.findOne({ name: 'lettuce' }),
          await Topping.findOne({ name: 'tomato' }),
        ],
        breadType: 'wheat',
      },
      {
        name: 'Tomato and cucumber',
        toppings: [
          await Topping.findOne({ name: 'tomato' }),
          await Topping.findOne({ name: 'cucumber' }),
        ],
        breadType: 'rye',
      },
    ];

    const sandwichPromises = exampleSandwiches.map(async (sandwich) => {
      const newSandwich = new Sandwich(sandwich);
      await newSandwich.save();
    });

    await Promise.all(sandwichPromises);

    const exampleOrders = [
      {
        sandwichId: await Sandwich.findOne({ name: 'Lettuce and tomato' }),
        status: 'ordered',
      },
      {
        sandwichId: await Sandwich.findOne({ name: 'Tomato and cucumber' }),
        status: 'ready',
      },
    ];

    const orderPromises = exampleOrders.map(async (order) => {
      const newOrder = new Order(order);
      await newOrder.save();
    });

    await Promise.all(orderPromises);

    console.log('Data seeded successfully');
    
  } catch (error) {
    console.error('Error:', error);
  }
};

module.exports = { connectToDb, seedDb };