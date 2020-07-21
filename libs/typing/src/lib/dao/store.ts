import { Sequence } from '@lightning-devs/sequences';

export interface Store {
    id: string;
    name: string;
    logo: string;
    color: string;
    link: string;
    sequence: Sequence[];
}


export interface Product {
    name: string;
    price: number;
    image: string;
    link: string;
}

export interface Fields {
    name: string,
    data: string,
    style: Map<string, string | number>;
}
