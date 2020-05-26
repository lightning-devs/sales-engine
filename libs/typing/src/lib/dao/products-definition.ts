export interface ProductsDefinition {
    queryPath?: string;
    propertyPath?: string;
    fields: {
        [key: string]: FieldDefinition
    };
}

export interface FieldDefinition {
    propertyPath?: string,
    queryPath?: string,
    fieldBase?: string,
    getBy: 'attribute' | 'text',
    transformationSequence?: TransformationSequence[],
}

export interface TransformationSequence {
    type: string,
    apply: {
        using: string,
        params?: any[]
    }
}
