import * as orderApi from '../../api/orderApi';
import { fetchCartItems, fetchTotalItemsNumber, fetchCartDiscount, fetchCartSubtotal, fetchCartTotal, fetchCartTax } from './cartActions';
import { clearCart } from './cartActions'; 
import { PLACE_ORDER_SUCCESS, PLACE_ORDER_FAILURE } from './actionTypes';

export const placeOrder = (userId, token) => async (dispatch) => {
    try {
        const orderData = await orderApi.placeOrder(userId, token);
        dispatch({ type: PLACE_ORDER_SUCCESS, payload: orderData });
        dispatch(clearCart(userId, token)); // Clear the cart after successful order placement
        dispatch(fetchCartItems(userId, token));
        dispatch(fetchTotalItemsNumber(userId, token));
        dispatch(fetchCartDiscount(userId, token));
        dispatch(fetchCartSubtotal(userId, token));
        dispatch(fetchCartTotal(userId, token));
        dispatch(fetchCartTax(userId, token));
    } catch (error) {
        dispatch({ type: PLACE_ORDER_FAILURE, payload: error.message });
    }
};