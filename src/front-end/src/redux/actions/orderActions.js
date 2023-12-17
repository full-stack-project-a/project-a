import * as orderApi from '../../api/orderApi';
import { fetchCartItems, fetchTotalItemsNumber, fetchCartDiscount, fetchCartSubtotal, fetchCartTotal, fetchCartTax } from './cartActions';
import { clearCart } from './cartActions'; 
import { PLACE_ORDER_SUCCESS, PLACE_ORDER_FAILURE } from './actionTypes';

export const placeOrder = () => async (dispatch) => {
    try {
        const orderData = await orderApi.placeOrder();
        dispatch({ type: PLACE_ORDER_SUCCESS, payload: orderData });
        dispatch(clearCart()); // Clear the cart after successful order placement
        dispatch(fetchCartItems());
        dispatch(fetchTotalItemsNumber());
        dispatch(fetchCartDiscount());
        dispatch(fetchCartSubtotal());
        dispatch(fetchCartTotal());
        dispatch(fetchCartTax());
    } catch (error) {
        dispatch({ type: PLACE_ORDER_FAILURE, payload: error.message });
    }
};