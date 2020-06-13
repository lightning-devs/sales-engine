import { Driver, FieldDefinition, Sequence } from '@lightning/typing';
import { parse } from 'node-html-parser';
import isEmpty from 'lodash/isEmpty';
import compose from 'lodash/flow';
import fp from 'lodash/fp';
import getCleaner from 'get-clean-string';

const cleaner = getCleaner();

const ownFunctions = {
    appendStart: startString => currentValue => startString + currentValue,
    appendEnd: finishString => currentValue => currentValue + finishString,
    clean: currentValue => cleaner(currentValue),
    select: queryPath => htmlElement => htmlElement.querySelector(queryPath),
    selectAll: queryPath => htmlElement => htmlElement.querySelectorAll(queryPath),
    getAttribute: propertyPath => htmlElement => htmlElement.getAttribute(propertyPath),
    getText: htmlElement => htmlElement.text
};

/*** @doc
 * @how
 * The conditional system is a breaking-on-false applied to the sequence, if a function on the sequence returns false, the sequence stops
 * Every function on the sequence should be curried and expect the actualValue as its last argument
 * @break
 * When a condition returns false, the rest of the sequence won't be executed and the final value it's gonna be an empty string
 * When the "apply" function doesn't exist in lodash/fp, the sequence stops
 * If something fails (e.g. an exception was thrown) the sequence stops
***/
function getTransformer(sequence: Sequence[]) {
    const functionsToBeComposed = sequence.map((transformation: Sequence) => {
        const { type, apply } = transformation;
        const { using, params } = apply;
        const functionToApply = fp[using] || ownFunctions[using];
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
        const { sequence } = fieldDefinition;
        const transformer = !isEmpty(sequence) && getTransformer(sequence);
        const operator = (productElement) => {
            if (!transformer) return 'TSRequired';
            const transformedValue = transformer(productElement);
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
