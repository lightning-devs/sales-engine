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
    getBy?: 'attribute' | 'text',
    sequence?: Sequence[],
}

export interface WhenBooleanRelations {
    is: string;
    it: string;
    andIt: string;
    andIs: string;
    orIt: string;
    orIs: string;
    isNot: string;
    itDoesnt: string;
    andIsNot: string;
    andItDoesnt: string;
    orIsNot: string;
    orItDoesnt: string;
    to: any[];
    this: any[];
}

export type Conditioner = {
    readonly [K in keyof WhenBooleanRelations]: WhenBooleanRelations[K];
}

export interface ConditionalCase {
    when: Conditioner;
    sequence: Sequence[];
}

export interface Sequence {
    type: 'expression' | 'condition' | 'map',
    cases?: ConditionalCase[]
    apply?: {
        using: string,
        params?: any[]
    }
    defaultCase?: Sequence;
}
