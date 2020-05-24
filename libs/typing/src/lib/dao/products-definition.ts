export interface ProductsDefinition {
    queryPath: string;
    fields: {
        [key: string]: {
            propertyPath?: string,
            queryPath?: string,
        }
    };
}
