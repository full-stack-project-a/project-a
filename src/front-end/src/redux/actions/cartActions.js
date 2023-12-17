import * as cartApi from '../../api/cartApi';
import { SET_CART_ITEMS, SET_ERROR, SET_SUBTOTAL, SET_TAX, SET_TOTAL, SET_DISCOUNT, SET_CART_NUMBER } from './actionTypes';

// Fetch cart items
export const fetchCartItems = (userId, token) => async dispatch => {
    try {
        const response = await cartApi.fetchCartItems(userId, token);
        dispatch({ type: SET_CART_ITEMS, payload: response.data.cartItems });
    } catch (error) {
        dispatch({ type: SET_ERROR, payload: error.message });
    }
};

// Add item to cart
export const addItemToCart = (userId, productId, quantity, token) => async dispatch => {
    try {
        await cartApi.addItemToCart(userId, productId, quantity, token);
        dispatch(fetchCartItems(userId, token));
        dispatch(fetchTotalItemsNumber(userId, token));
        dispatch(fetchCartDiscount(userId, token));
        dispatch(fetchCartSubtotal(userId, token));
        dispatch(fetchCartTotal(userId, token));
        dispatch(fetchCartTax(userId, token));
    } catch (error) {
        dispatch({ type: SET_ERROR, payload: error.message });
    }
};

// Update cart item quantity
export const updateCartItemQuantity = (userId, productId, quantity, token) => async dispatch => {
    try {
        await cartApi.updateCartItemQuantity(userId, productId, quantity, token);
        dispatch(fetchCartItems(userId, token));
        dispatch(fetchTotalItemsNumber(userId, token));
        dispatch(fetchCartDiscount(userId, token));
        dispatch(fetchCartSubtotal(userId, token));
        dispatch(fetchCartTotal(userId, token));
        dispatch(fetchCartTax(userId, token));
    } catch (error) {
        dispatch({ type: SET_ERROR, payload: error.message });
    }
};

// Remove item from cart
export const removeCartItem = (userId, productId, token) => async dispatch => {
    try {
        await cartApi.removeCartItem(userId, productId, token);
        dispatch(fetchCartItems(userId, token));
        dispatch(fetchTotalItemsNumber(userId, token));
        dispatch(fetchCartDiscount(userId, token));
        dispatch(fetchCartSubtotal(userId, token));
        dispatch(fetchCartTotal(userId, token));
        dispatch(fetchCartTax(userId, token));
    } catch (error) {
        dispatch({ type: SET_ERROR, payload: error.message });
    }
};

// Apply discount code
export const applyDiscountCode = (userId, discountCode, token) => async dispatch => {
    try {
        await cartApi.applyDiscountCode(userId, discountCode, token);
        dispatch(fetchCartDiscount(userId, token));
        dispatch(fetchCartTotal(userId, token));
    } catch (error) {
        dispatch({ type: SET_ERROR, payload: error.message });
    }
};

// Clear the shopping cart
export const clearCart = (userId, token) => async dispatch => {
    try {
        await cartApi.clearCart(userId, token);
        dispatch(fetchCartItems(userId, token));
    } catch (error) {
        dispatch({ type: SET_ERROR, payload: error.message });
    }
};

// Fetch cart subtotal
export const fetchCartSubtotal = (userId, token) => async dispatch => {
    try {
        const response = await cartApi.fetchCartSubtotal(userId, token);
        dispatch({ type: SET_SUBTOTAL, payload: response.data.subtotal });
    } catch (error) {
        dispatch({ type: SET_ERROR, payload: error.message });
    }
};

// Fetch cart tax
export const fetchCartTax = (userId, token) => async dispatch => {
    try {
        const response = await cartApi.fetchCartTax(userId, token);
        dispatch({ type: SET_TAX, payload: response.data.tax });
    } catch (error) {
        dispatch({ type: SET_ERROR, payload: error.message });
    }
};

// Fetch cart total
export const fetchCartTotal = (userId, token) => async dispatch => {
    try {
        const response = await cartApi.fetchCartTotal(userId, token);
        dispatch({ type: SET_TOTAL, payload: response.estimatedTotal });
    } catch (error) {
        dispatch({ type: SET_ERROR, payload: error.message });
    }
};

// Fetch cart discount
export const fetchCartDiscount = (userId, token) => async dispatch => {
    try {
        const response = await cartApi.fetchCartDiscount(userId, token);
        dispatch({ type: SET_DISCOUNT, payload: response.data.discount });
    } catch (error) {
        dispatch({ type: SET_ERROR, payload: error.message });
    }
};

// Fetch total items number
export const fetchTotalItemsNumber = (userId, token) => async dispatch => {
    try {
        const response = await cartApi.fetchCartItemsNumber(userId, token);
        dispatch({ type: SET_CART_NUMBER, payload: response.data.totalItems });
    } catch (error) {
        dispatch({ type: SET_ERROR, payload: error.message });
    }
};