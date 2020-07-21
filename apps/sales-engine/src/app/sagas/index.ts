import { all } from 'redux-saga/effects';
import storesSagas from './stores.saga';

export default function* rootSaga() {
    console.log('rootSaga', storesSagas);
    yield all([
        ...storesSagas
    ]);
}
