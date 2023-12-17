import { SET_CART_ITEMS, SET_CART_NUMBER, SET_ERROR, SET_SUBTOTAL, SET_TAX, SET_TOTAL, SET_DISCOUNT, CLEAR_CART } from '../actions/actionTypes';


const initialState = {
    items: [],
    subtotal: 0,
    tax: 0,
    total: 0,
    discount: 0,
    cartItemsNumber: 0,
    error: null
};

const shoppingCartReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CART_ITEMS:
            return {
                ...state,
                items: action.payload
            };
        case SET_CART_NUMBER:
            return {
                ...state,
                cartItemsNumber: action.payload
            };
        case SET_SUBTOTAL:
            return {
                ...state,
                subtotal: action.payload
            };
        case SET_TAX:
            return {
                ...state,
                tax: action.payload
            };
        case SET_TOTAL:
            return {
                ...state,
                total: action.payload
            };
        case SET_DISCOUNT:
            return {
                ...state,
                discount: action.payload
            };
        case SET_ERROR:
            return {
                ...state,
                error: action.payload
            };
        case CLEAR_CART:
            return {
                ...initialState
            };
        default:
            return state;
    }
};

export default shoppingCartReducer;
