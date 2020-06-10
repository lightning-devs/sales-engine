import { Search } from './search';
import { ProductsDefinition } from './products-definition';

export interface Driver {
    id: string;
    name: string;
    type: 'html' | 'json';
    search: Search;
    sequence: any;
    productsDefinition?: ProductsDefinition;
}
