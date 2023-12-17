import { combineReducers } from 'redux';
import shoppingCartReducer from './shoppingCartReducer';
import orderReducer from './orderReducer';

const rootReducer = combineReducers({
    shoppingCart: shoppingCartReducer,
    order: orderReducer,
    // ... other reducers if you have
});

export default rootReducer;