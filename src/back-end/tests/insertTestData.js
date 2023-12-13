const mongoose = require('mongoose');
const { User } = require('../models/userSchema'); 
const Product = require('../models/product'); 

// Connect to your MongoDB database
mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Sample test data
const usersData = [
  {
    username: 'user1',
    password: 'password1',
    role: 'customer',
  },
  {
    username: 'user2',
    password: 'password2',
    role: 'vendor',
  },
];

const productsData = [
  {
    name: 'Product 1',
    description: 'Description 1',
    category: 'Category 1',
    price: 10.99,
    inStockQuantity: 50,
    imageUrl: 'product1.jpg',
  },
  {
    name: 'Product 2',
    description: 'Description 2',
    category: 'Category 2',
    price: 15.99,
    inStockQuantity: 30,
    imageUrl: 'product2.jpg',
  },
];

async function seedData() {
  try {
    // Insert users data
    await User.insertMany(usersData);

    // Insert products data
    await Product.insertMany(productsData);

    console.log('Data inserted successfully.');
  } catch (error) {
    console.error('Error inserting data:', error);
  } finally {
    // Close the database connection
    mongoose.disconnect();
  }
}

// Run the data seeding function
seedData();
