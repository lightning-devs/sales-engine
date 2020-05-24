export interface ProductsDefinition {
    queryPath?: string;
    propertyPath?: string;
    fields: {
        [key: string]: {
            propertyPath?: string,
            queryPath?: string,
        }
    };
}
