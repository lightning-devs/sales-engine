import { createSlice } from '@reduxjs/toolkit';
import { Store } from '@lightning/typing';
import { isEmpty } from 'lodash';

interface StoresFeatureState {
    stores: Store[];
    selectedStores: Store[];
}

const initialState: StoresFeatureState = {
    stores: [],
    selectedStores: []
}

const storesSlice = createSlice({
    name: 'stores',
    initialState,
    reducers: {
        loadStores(state: StoresFeatureState, action) {
            const { stores } = action.payload;
            state.stores = stores;
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

export const { loadStores, addSelectedStore, removeStoreFromSelected, cleanSelectedStores } = storesSlice.actions;

export default storesSlice.reducer;
