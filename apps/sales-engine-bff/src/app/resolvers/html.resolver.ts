import { Driver, FieldDefinition, TransformationSequence } from '@lightning/typing';
import { Product } from '@lightning/typing';
import { parse } from 'node-html-parser';
import isEmpty from 'lodash/isEmpty';
import compose from 'lodash/flow';
import fp from 'lodash/fp';

const getters = getBy => element => {
    const getterFunctions = {
        attribute: (propertyPath) => element.getAttribute(propertyPath),
        text: () => element.text
    }
    return getterFunctions[getBy];
}

/*** @doc
 * @how
 * The conditional system is a breaking-on-false applied to the sequence, if a function on the sequence returns false, the sequence stops
 * Every function on the sequence should be curried and expect the actualValue as its last argument
 * @break
 * When a condition returns false, the rest of the sequence won't be executed and the final value it's gonna be an empty string
 * When the "apply" function doesn't exist in lodash/fp, the sequence stops
 * If something fails (e.g. an exception was thrown) the sequence stops
***/
function getTransformer(sequence: TransformationSequence[]) {
    const functionsToBeComposed = sequence.map((transformation: TransformationSequence) => {
        const { type, apply } = transformation;
        const { using, params } = apply;
        const functionToApply = fp[using];
        if (!functionToApply) return false;
        try {
            const partialFunction = !isEmpty(params) ? functionToApply(...params) : functionToApply;
            if (typeof partialFunction !== 'function') return false;
            if (type === 'condition') {
                return (currentValue) => {
                    const result = partialFunction(currentValue);
                    if (result) return currentValue;
                    return false;
                }
            }
            return partialFunction;
        } catch (err) {
            console.error(err);
            return false;
        }
    });
    return compose(...functionsToBeComposed);
}

/***
 *
 * @param fields
 * @returns { [key: string ]: composedOperator }
 * @return-type composedOperator It receives an HtmlElement and returns a primitive value whose transformation was made using a FieldDefinition
 */
function getResolverFields(fields: { [key: string]: FieldDefinition }) {
    return Object.entries(fields).reduce((fieldOperators, [key, fieldDefinition]) => {
        const { queryPath, getBy, propertyPath, transformationSequence } = fieldDefinition;
        const transformer = !isEmpty(transformationSequence) && getTransformer(transformationSequence);
        const partialGetter = getters(getBy);
        const operator = (productElement) => {
            const element = !isEmpty(queryPath) ? productElement.querySelector(queryPath) : productElement;

            if (!partialGetter) return '';
            const getter = partialGetter(element);

            if (!getter) return '';
            const actualValue = getter(propertyPath);
            if (isEmpty(actualValue)) return '';

            if (!transformer) return actualValue;
            const transformedValue = transformer(actualValue);
            return isEmpty(transformedValue) ? '' : transformedValue;
        }
        fieldOperators[key] = operator || (() => '');
        return fieldOperators;
    }, {});
}

export default class HTMLResolver {
    static resolve = (driver: Driver) => (data: any) => {
        const html: any = parse(data);
        const { productsDefinition } = driver;
        const { queryPath, fields } = productsDefinition;
        const elements = html.querySelectorAll(queryPath);

        const resolverFields = getResolverFields(fields);
        const products = elements.map(element => {
            return Object.keys(fields).reduce((acc, key) => {
                acc[key] = resolverFields[key](element);
                return acc;
            }, {});
        })
        return products;
    }
}

/*
export default class HTMLResolver {
    static resolve = (driver: Driver) => (data: any) => {
        // parse the html data
        const html: any = parse(data);

        const { productsDefinition } = driver;
        const { queryPath, fields } = productsDefinition;

        const items = html.querySelectorAll(queryPath);

        const products: Product[] = items.map(item => {
            const product: Product = {
                name: '',
                price: 0,
                image: '',
                link: '',
            };

            Object.entries(fields).forEach(([key, value]) => {

                // join field value with a static pre-defined value
                // e.x. join domain + product link
                const { fieldBase, getBy, transformationSequence } = value;


                let val = fieldBase || '';

                val += value.hasOwnProperty('queryPath') ? item.querySelector(value.queryPath).getAttribute(value.propertyPath) : item.getAttribute(value.propertyPath);

                product[key] = val;
            });

            return product;
        });

        return products;
    }
}
*/
