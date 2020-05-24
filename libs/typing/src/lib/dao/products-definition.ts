export interface ProductsDefinition {
    queryPath: string;
    fields: {
        [key: string]: {
            attribute?: string,
            query?: string,
        }
    };
}
