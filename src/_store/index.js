import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import toons from '../_reducers/toons';
import favorites from '../_reducers/favorites';


// The Global state
const rootReducer = combineReducers({
    toons,
    favorites,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;