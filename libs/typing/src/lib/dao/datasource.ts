export interface DataSource {
    name: string; // Store's Name
    searchLink: string; // homepage
    logo: string; // link to the image logo
}

export interface Product {
    name: string;
    price: number;
    image: string;
    link: string;
    fields?: Fields[];
}

export interface Fields {
    name: string,
    data: string,
    style: Map<string, string | number>;
}
