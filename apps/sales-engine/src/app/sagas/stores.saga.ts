import { call, put, takeLatest } from 'redux-saga/effects';
import { loadStores, loadStoresFailure, loadStoresSuccess } from '../features/stores.feature';
import { getStores } from '../services/stores.service';

export function* onLoadStores() {
    try {
        const stores = yield call(getStores);
        yield put(loadStoresSuccess({ stores }));
    } catch (err) {
        if (typeof err === 'string') {
            yield put(loadStoresFailure({ message: err }));
        }
        yield put(loadStoresFailure('error'));
    }
}

export function* watchLoadStores() {
    const { type: loadStoresType } = loadStores();
    console.log('==>', loadStoresType);
    yield takeLatest(loadStoresType, onLoadStores);
}

export default [
    watchLoadStores(),
];
