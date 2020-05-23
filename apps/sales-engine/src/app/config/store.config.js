import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import sagaMiddleware from 'redux-saga';

const store = configureStore({
    reducer: {},
    middleware: [...getDefaultMiddleware({ thunk: false }), sagaMiddleware],
});

export default store;
