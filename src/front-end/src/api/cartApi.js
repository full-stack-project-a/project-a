import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api/v1';
const TEST_USER_ID = '6577a7f2a4603ab4ef7cbd50';

// Fetch cart items for a specific user
export const fetchCart = async () => {
    return axios.get(`${API_BASE_URL}/cart/${TEST_USER_ID}/load`);
};

// Add an item to the cart
export const addItemToCart = async (productId, quantity) => {
    return axios.post(`${API_BASE_URL}/cart/${TEST_USER_ID}/add`, {
        productId,
        quantity
    });
};

// Update an item's quantity in the cart
export const updateCartItemQuantity = async (productId, quantity) => {
    return axios.put(`${API_BASE_URL}/cart/${TEST_USER_ID}/cartItem/${productId}`, {
        quantity
    });
};

// Remove an item from the cart
export const removeCartItem = async (productId) => {
    return axios.delete(`${API_BASE_URL}/cart/${TEST_USER_ID}/cartItem/${productId}`);
};

// Apply a discount code to the cart
export const applyDiscountCode = async (discountCode) => {
    return axios.post(`${API_BASE_URL}/cart/${TEST_USER_ID}/discount`, {
        discountCode
    });
};

// Clear the shopping cart
export const clearCart = async () => {
    return axios.post(`${API_BASE_URL}/cart/${TEST_USER_ID}/clear`);
};

// Fetch cart subtotal
export const fetchCartSubtotal = async () => {
    return axios.get(`${API_BASE_URL}/cart/${TEST_USER_ID}/subtotal`);
};

// Fetch cart tax
export const fetchCartTax = async () => {
    return axios.get(`${API_BASE_URL}/cart/${TEST_USER_ID}/tax`);
};

// Fetch cart total (with discounts and tax)
export const fetchCartTotal = async () => {
    return axios.get(`${API_BASE_URL}/cart/${TEST_USER_ID}/estimatedTotal`);
};

// Fetch cart discount (with discounts and tax)
export const fetchCartDiscount = async () => {
    return axios.get(`${API_BASE_URL}/cart/${TEST_USER_ID}/discount`);
};

// Fetch cart items
export const fetchCartItems = async () => {
    return axios.get(`${API_BASE_URL}/cart/${TEST_USER_ID}/cartItems`);
};

// Fetch cart items number
export const fetchCartItemsNumber = async () => {
    return axios.get(`${API_BASE_URL}/cart/${TEST_USER_ID}/totalItems`);
};

