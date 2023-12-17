import axios from 'axios';
// import { useAppContext } from "../context/AppContext";
// const { auth } = useAppContext();

const API_BASE_URL = 'http://localhost:8000/api/v1';
// const TEST_USER_ID = '6577a7f2a4603ab4ef7cbd50';

// Fetch cart items for a specific user
export const fetchCart = async (userId, token) => {
    return axios.get(`${API_BASE_URL}/cart/${userId}/load`, {
        headers: {
           Authorization: `Bearer ${token}` // Include the JWT token here
        }
     });
};

// Add an item to the cart
export const addItemToCart = async (userId, productId, quantity, token) => {
    return axios.post(`${API_BASE_URL}/cart/${userId}/cartItem/${productId}`, {
        productId,
        quantity
    }, {
        headers: {
           Authorization: `Bearer ${token}` // Include the JWT token here
        }
     });
};

// Update an item's quantity in the cart
export const updateCartItemQuantity = async (userId, productId, quantity, token) => {
    return axios.put(`${API_BASE_URL}/cart/${userId}/cartItem/${productId}`, {
        quantity
    }, {
        headers: {
           Authorization: `Bearer ${token}` // Include the JWT token here
        }
     });
};

// Remove an item from the cart
export const removeCartItem = async (userId, productId, token) => {
    return axios.delete(`${API_BASE_URL}/cart/${userId}/cartItem/${productId}`, {
        headers: {
           Authorization: `Bearer ${token}` // Include the JWT token here
        }
     });
};

// Apply a discount code to the cart
export const applyDiscountCode = async (userId, discountCode, token) => {
    return axios.post(`${API_BASE_URL}/cart/${userId}/discount`, {
        discountCode
    }, {
        headers: {
           Authorization: `Bearer ${token}` // Include the JWT token here
        }
     });
};

// Clear the shopping cart
export const clearCart = async (userId, token) => {
    return axios.delete(`${API_BASE_URL}/cart/${userId}/clear`, {
        headers: {
           Authorization: `Bearer ${token}` // Include the JWT token here
        }
     });
};

// Fetch cart subtotal
export const fetchCartSubtotal = async (userId, token) => {
    return axios.get(`${API_BASE_URL}/cart/${userId}/subtotal`, {
        headers: {
           Authorization: `Bearer ${token}` // Include the JWT token here
        }
     });
};

// Fetch cart tax
export const fetchCartTax = async (userId, token) => {
    return axios.get(`${API_BASE_URL}/cart/${userId}/tax`, {
        headers: {
           Authorization: `Bearer ${token}` // Include the JWT token here
        }
     });
};

// Fetch cart total (with discounts and tax)
export const fetchCartTotal = async (userId, token) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/cart/${userId}/estimatedTotal`, {
            headers: {
                'Authorization': `Bearer ${token}` // Include the token in the request headers
            }
        });
        return response.data; // Or process as needed for your application
    } catch (error) {
        console.error('Error fetching cart total:', error);
        // Optionally, handle the error based on your application requirements
        throw error;
    }
};

// Fetch cart discount
export const fetchCartDiscount = async (userId, token) => {
    // return axios.get(`${API_BASE_URL}/cart/${userId}/discount`);
    return axios.get(`${API_BASE_URL}/cart/${userId}/discount`, {
        headers: {
           Authorization: `Bearer ${token}` // Include the JWT token here
        }
     });
};

// Fetch cart items
export const fetchCartItems = async (userId, token) => {
    return axios.get(`${API_BASE_URL}/cart/${userId}/cartItems`, {
        headers: {
           Authorization: `Bearer ${token}` // Include the JWT token here
        }
     });
};

// Fetch cart items number
export const fetchCartItemsNumber = async (userId, token) => {
    return axios.get(`${API_BASE_URL}/cart/${userId}/totalItems`, {
        headers: {
           Authorization: `Bearer ${token}` // Include the JWT token here
        }
     });
};

