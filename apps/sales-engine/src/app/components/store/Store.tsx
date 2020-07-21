import React from 'react';
import { Store } from '@lightning/typing'

export interface StoreProps {
    store: Store;
    isSelected?: boolean;
    isHorizontal?: boolean;
}

function Store(props: StoreProps) {
    const { store, isSelected = false, isHorizontal = false } = props;

    return (
        <div></div>
    )
}

export default Store;