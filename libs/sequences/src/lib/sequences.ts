import { FieldDefinition, Sequence, FunctionSeeker } from '@lightning/typing';
import isEmpty from 'lodash/isEmpty';
import { reduce } from 'awaity/fp';
import { getFunctionSeeker } from './functionSeeker';

function asyncCompose(...functions) {
    return async (initialValue) => {
        const reduced = reduce(async (finalValue, currentFunction) => {
            let currentValue = currentFunction(finalValue);
            if (currentValue instanceof Promise) {
                currentValue = await currentValue;
            }
            return currentValue;
        }, initialValue);
        return await reduced(functions);
    }
}

const getFieldsFunction = (functionSeeker: FunctionSeeker) => async ({ fieldsSequences } : { fieldsSequences: Array<FieldDefinition> }) => {
    const reducedFields = reduce(async (fieldOperators, [key, fieldDefinition]) => {
        const { sequence } = fieldDefinition;
        const transformer = !isEmpty(sequence) && (getTransformer(sequence, functionSeeker));
        const operator = async (itemValue) => {
            if (!transformer) return 'Sequence Required';
            const transformedValue = await transformer(itemValue);
            return isEmpty(transformedValue) ? '' : transformedValue;
        }
        fieldOperators[key] = operator || (() => '');
        return fieldOperators;
    }, {});
    const fieldsTransformers = await reducedFields(Object.entries(fieldsSequences));
    return async element => {
        const reducedFields = reduce(async (acc, key) => {
            acc[key] = await fieldsTransformers[key](element);
            return acc;
        }, {});
        return await reducedFields(Object.keys(fieldsTransformers));
    }
}

const map = (mapFunction: (item) => Object) => async (valueArray: Array<Object>) => {
    const mappedValues = valueArray.map((await mapFunction));
    return await Promise.all(mappedValues);
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
function getTransformer(sequences: Sequence[], functionSeeker: FunctionSeeker): (any) => Promise<any> {
    const functionsToBeComposed = sequences.map((sequence: Sequence) => {
        const { type, apply } = sequence;
        const { using, params } = apply;
        const functionToApply = functionSeeker(using);
        if (!functionToApply) {
            throw new Error(`This function couldn't be find ${using}, therefore it was skipped by the sequence`);
        }
        let partialFunction = functionToApply;
        if (!isEmpty(params)) {
            if (Array.isArray(params)) {
                partialFunction = functionToApply(...params);
            } else {
                partialFunction = functionToApply(params);
            }
        }
        if (type === 'map') {
            return map(partialFunction as (item) => Object);
        }
        return partialFunction;
    });
    return asyncCompose(...functionsToBeComposed);
}

const returns = (returnValue) => () => returnValue;
const getSequencerExpression = sourceOfFunctions => async ({ initialValues, currentValue: sequence }) => {
    return await getSequencer(...sourceOfFunctions)({ initialValues, sequence });
}

export function getSequencer(...sourcesOfFunctions) {
    return async ({ sequence, initialValues }) => {
        try {
            const sequencerExpression = getSequencerExpression(sourcesOfFunctions);
            const sources = [...sourcesOfFunctions, { returns, sequencer: sequencerExpression }];
            const fields = getFieldsFunction(getFunctionSeeker(sources));
            const functionSeeker = getFunctionSeeker([...sources, { fields }]);
            const transformer = getTransformer(sequence, functionSeeker);
            return await transformer(initialValues);
        } catch (error) {
            console.error(error);
        }
        return null;
    }
}
