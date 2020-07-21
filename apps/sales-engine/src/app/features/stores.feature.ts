import { createSlice } from '@reduxjs/toolkit';
import { Store } from '@lightning/typing';
import { isEmpty } from 'lodash';

interface StoresFeatureState {
    stores: Store[];
    selectedStores: Store[];
    isLoading: boolean;
    errorMessage: string
}

const initialState: StoresFeatureState = {
    stores: [],
    selectedStores: [],
    isLoading: false,
    errorMessage: '',
}

const storesSlice = createSlice({
    name: 'stores',
    initialState,
    reducers: {
        loadStores(state: StoresFeatureState) {
            state.isLoading = true;
        },
        loadStoresSuccess(state: StoresFeatureState, action) {
            const { stores } = action.payload;
            if (!isEmpty(stores)) {
                state.stores = stores;
            } else {
                state.errorMessage = 'error';
            }
            state.isLoading = false;
        },
        loadStoresFailure(state: StoresFeatureState, action) {
            const { message } = action.payload;
            if (message) {
                state.errorMessage = message;
            }
            state.isLoading = false;
        },
        addSelectedStore(state: StoresFeatureState, action) {
            const { store } = action.payload;
            if (!isEmpty(store)) {
                state.selectedStores.push(store);
            }
        },
        removeStoreFromSelected(state: StoresFeatureState, action) {
            const { id } = action.payload;
            if (!isEmpty(id)) {
                state.selectedStores = state.selectedStores.filter(store => store.id !== id);
            }
        },
        cleanSelectedStores(state: StoresFeatureState) {
            state.selectedStores = [];
        }
    }
});

export const {
    loadStores,
    loadStoresSuccess,
    loadStoresFailure,
    addSelectedStore,
    removeStoreFromSelected,
    cleanSelectedStores,
} = storesSlice.actions;

export default storesSlice.reducer;
