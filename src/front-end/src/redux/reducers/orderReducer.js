import { PLACE_ORDER_SUCCESS, PLACE_ORDER_FAILURE } from '../actions/actionTypes';

const initialState = {
    order: null,
    error: null
};

const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case PLACE_ORDER_SUCCESS:
            return { ...state, order: action.payload, error: null };
        case PLACE_ORDER_FAILURE:
            return { ...state, error: action.payload };
        default:
            return state;
    }
};

export default orderReducer;
