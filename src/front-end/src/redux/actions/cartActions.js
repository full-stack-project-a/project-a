import * as cartApi from '../../api/cartApi';
import { SET_CART_ITEMS, SET_ERROR, SET_SUBTOTAL, SET_TAX, SET_TOTAL, SET_DISCOUNT, SET_CART_NUMBER } from './actionTypes';


// Fetch cart items
export const fetchCartItems = () => async dispatch => {
    try {
        const response = await cartApi.fetchCartItems();
        dispatch({ type: SET_CART_ITEMS, payload: response.data.cartItems });
    } catch (error) {
        dispatch({ type: SET_ERROR, payload: error.message });
    }
};

// Add item to cart
export const addItemToCart = (productId, quantity) => async dispatch => {
    try {
        await cartApi.addItemToCart(productId, quantity);
        dispatch(fetchCartItems());
        dispatch(fetchTotalItemsNumber());
        dispatch(fetchCartDiscount());
        dispatch(fetchCartSubtotal());
        dispatch(fetchCartTotal());
        dispatch(fetchCartTax());
    } catch (error) {
        dispatch({ type: SET_ERROR, payload: error.message });
    }
};

// Update cart item quantity
export const updateCartItemQuantity = (productId, quantity) => async dispatch => {
    try {
        await cartApi.updateCartItemQuantity(productId, quantity);
        dispatch(fetchCartItems());
        dispatch(fetchTotalItemsNumber());
        dispatch(fetchCartDiscount());
        dispatch(fetchCartSubtotal());
        dispatch(fetchCartTotal());
        dispatch(fetchCartTax());
    } catch (error) {
        dispatch({ type: SET_ERROR, payload: error.message });
    }
};

// Remove item from cart
export const removeCartItem = (productId) => async dispatch => {
    try {
        await cartApi.removeCartItem(productId);
        dispatch(fetchCartItems());
        dispatch(fetchTotalItemsNumber());
        dispatch(fetchCartDiscount());
        dispatch(fetchCartSubtotal());
        dispatch(fetchCartTotal());
        dispatch(fetchCartTax());
    } catch (error) {
        dispatch({ type: SET_ERROR, payload: error.message });
    }
};

// Apply discount code
export const applyDiscountCode = (discountCode) => async dispatch => {
    try {
        await cartApi.applyDiscountCode(discountCode);
        dispatch(fetchCartDiscount());
        dispatch(fetchCartTotal());
    } catch (error) {
        dispatch({ type: SET_ERROR, payload: error.message });
    }
};

// Clear the shopping cart
export const clearCart = () => async dispatch => {
    try {
        await cartApi.clearCart();
        dispatch(fetchCartItems());
    } catch (error) {
        dispatch({ type: SET_ERROR, payload: error.message });
    }
};

// Fetch cart subtotal
export const fetchCartSubtotal = () => async dispatch => {
    try {
        const response = await cartApi.fetchCartSubtotal();
        dispatch({ type: SET_SUBTOTAL, payload: response.data.subtotal });
    } catch (error) {
        dispatch({ type: SET_ERROR, payload: error.message });
    }
};

// Fetch cart tax
export const fetchCartTax = () => async dispatch => {
    try {
        const response = await cartApi.fetchCartTax();
        dispatch({ type: SET_TAX, payload: response.data.tax });
    } catch (error) {
        dispatch({ type: SET_ERROR, payload: error.message });
    }
};

// Fetch cart total
export const fetchCartTotal = () => async dispatch => {
    try {
        const response = await cartApi.fetchCartTotal();
        dispatch({ type: SET_TOTAL, payload: response.data.estimatedTotal });
    } catch (error) {
        dispatch({ type: SET_ERROR, payload: error.message });
    }
};

// Fetch cart discount
export const fetchCartDiscount = () => async dispatch => {
    try {
        const response = await cartApi.fetchCartDiscount();
        dispatch({ type: SET_DISCOUNT, payload: response.data.discount });
    } catch (error) {
        dispatch({ type: SET_ERROR, payload: error.message });
    }
};

// Fetch total items number
export const fetchTotalItemsNumber = () => async dispatch => {
    try {
        const response = await cartApi.fetchCartItemsNumber();
        dispatch({ type: SET_CART_NUMBER, payload: response.data.totalItems });
    } catch (error) {
        dispatch({ type: SET_ERROR, payload: error.message });
    }
};