const mongoose = require('mongoose');
const ShoppingCart = require('../models/shoppingCart'); // Import your ShoppingCart model

// Connect to your MongoDB database
mongoose.connect('mongodb+srv://wei:1qaz2wsx3edc@chuwa-project-a.m6jd8rr.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Sample shopping cart data
const shoppingCartData = [
  {
    user: '6577a7f2a4603ab4ef7cbd50', // Replace 'userId1' with the actual user ID
    items: [
      {
        product: '657267ed0f9e834d6ce3f316', // Replace 'productId1' with the actual product ID
        quantity: 2,
      },
      {
        product: '657381f5fc05a303c0901f07', // Replace 'productId2' with the actual product ID
        quantity: 1,
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