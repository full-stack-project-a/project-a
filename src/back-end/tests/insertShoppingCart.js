const mongoose = require('mongoose');
const ShoppingCart = require('../models/shoppingCart'); // Import your ShoppingCart model

// Connect to your MongoDB database

const MONGODB_URL='mongodb+srv://wei:1qaz2wsx3edc@chuwa-project-a.m6jd8rr.mongodb.net/'


mongoose.connect(MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Sample shopping cart data
const shoppingCartData = [
  {
    user: '657e6d9ff085dc60e156c494', // Replace 'userId1' with the actual user ID
    items: [
      {
        product: '657267ed0f9e834d6ce3f316', // Replace 'productId1' with the actual product ID
        quantity: 2,
      },
      {
        product: '657381f5fc05a303c0901f07', // Replace 'productId2' with the actual product ID
        quantity: 1,
      },
      {
        product: '65738272fc05a303c0901f16', // Replace 'productId3' with the actual product ID
        quantity: 2,
      },
    ],
  },
  // Add more shopping cart records as needed
];

async function seedShoppingCartData() {
  try {
    // Insert shopping cart data
    await ShoppingCart.insertMany(shoppingCartData);

    console.log('Shopping cart data inserted successfully.');
  } catch (error) {
    console.error('Error inserting shopping cart data:', error);
  } finally {
    // Close the database connection
    mongoose.disconnect();
  }
}

// Run the data seeding function
seedShoppingCartData();