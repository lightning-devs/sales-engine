import { Search } from './search';
import { ProductsDefinition } from './sequences.type';

export interface Driver {
    id: string;
    name: string;
    type: 'html' | 'json';
    search: Search;
    sequence: any;
    productsDefinition?: ProductsDefinition;
}
