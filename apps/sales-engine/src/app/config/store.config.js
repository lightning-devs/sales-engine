import { combineReducers } from 'redux';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import sagaMiddleware from 'redux-saga';
import storesReducer from '../features/storesFeature';


const reducer = combineReducers({
    stores: storesReducer,
})

const store = configureStore({
    reducer,
    middleware: [...getDefaultMiddleware({ thunk: false }), sagaMiddleware],
});

export default store;
