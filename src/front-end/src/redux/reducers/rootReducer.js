import { combineReducers } from 'redux';
import shoppingCartReducer from './shoppingCartReducer';

const rootReducer = combineReducers({
    shoppingCart: shoppingCartReducer,
    // ... other reducers if you have
});

export default rootReducer;