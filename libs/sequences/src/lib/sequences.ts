import { FieldDefinition, Sequence, Conditioner } from '@lightning/typing';
import isEmpty from 'lodash/isEmpty';
import compose from 'lodash/flow';
import memoize from 'lodash/memoize';
import { reduce } from 'awaity/fp';

type FunctionSeeker = (functionName: string) => Function

const booleanRelations = ['is', 'it'];
const andBooleanRelations = ['andIt', 'andIs'];
const orRelations = ['orIt', 'orIs'];
const negatedRelations = ['isNot', 'itDoesnt'];
const andNegatedRelations = ['andIsNot', ' andItDoesnt'];
const orNegatedRelations = ['orIsNot', 'orItDoesnt'];
const allBooleanRelations = [...booleanRelations, ...andBooleanRelations, ...orRelations];
const allNegatedRelations = [...negatedRelations, ...andNegatedRelations, ...orNegatedRelations];
const allRelations = [...allBooleanRelations, ...allNegatedRelations];
const allOrRelations = [...orRelations, ...orNegatedRelations];
const allAndRelations = [...andNegatedRelations, ...andBooleanRelations];
const paramProperties = ['to', 'this'];
// const negationRegex = /not|nt/i;
// .test('doesnt')

const logs = (func) => {
    return (...params) => {
        console.log(params);
        return func(...params);
    }
}

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

const getFunctionSeeker = (sourceFunctions: Array<{ [key: string]: Function }>) => memoize((functionName: string): FunctionSeeker => {
    return sourceFunctions.reduce((acc, currentSource) => {
        const func = currentSource[functionName];
        if (func) return func;
        return acc;
    }, null) as FunctionSeeker;
});

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

const getConditioner = (conditioners: Conditioner[], functionSeeker: FunctionSeeker) => {
    if (isEmpty(conditioners)) throw new Error('The "when" clause must have at least 1 conditioner.')
    const conditionersToCompose = conditioners.map((conditioner) => {
        const conditionerKeys = Object.keys(conditioner);
        if (conditionerKeys.length > 2) throw new Error('There to many properties on the conditional case');
        if (conditionerKeys.length === 0) throw new Error('Some conditioners don\'t have the right amount of parameters');
        const [relation, value] = Object.entries(conditioner).find(([key]) => allRelations.includes(key));
        const [, params = [] ] = Object.entries(conditioner).find(([key]) => paramProperties.includes(key));
        const functionToApply = functionSeeker(value as string) || (() => val => val);
        const partialFunction = functionToApply(...params);
        const shouldNegateBoolean = allNegatedRelations.includes(relation);
        const isOrRelation = allOrRelations.includes(relation);
        const isAndRelation = allAndRelations.includes(relation);
        return (currentParameters) => {
            const { currentBoolean, currentValue } = currentParameters;
            const gottenBoolean = partialFunction(currentValue);
            if (typeof gottenBoolean !== 'boolean') return currentParameters;
            const actualBoolean = shouldNegateBoolean ? !gottenBoolean : gottenBoolean;
            let nextBoolean = actualBoolean;
            if (isOrRelation) nextBoolean = currentBoolean || actualBoolean;
            if (isAndRelation) nextBoolean = currentBoolean && actualBoolean;
            return { currentBoolean: nextBoolean, currentValue };
        };
    }, []);
    return compose((currentValue) => ({ currentBoolean: false, currentValue }), ...conditionersToCompose);
}
const getConditionalSequences = (functionSeeker: FunctionSeeker, conditionalSequence) => {
    const { cases = [], defaultCase = [] } = conditionalSequence;
    const defaultTransformer = getTransformer(defaultCase, functionSeeker);
    const casesWithTransformers = cases.map(currentCase => {
        const { when, sequence } = currentCase;
        return {
            when: getConditioner(when, functionSeeker),
            sequence: getTransformer(sequence, functionSeeker)
        }
    });
    return async (currentValue) => {
        const passedCase = casesWithTransformers.find(({ when }) => when(currentValue).currentBoolean);
        if (!isEmpty(passedCase)) return await passedCase.sequence(currentValue);
        try {
            return await defaultTransformer(currentValue);
        } catch (err) {
            console.error('error', err);
        }
        return '';
    }
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
function getTransformer(sequences: Sequence[], functionSeeker: FunctionSeeker): (any) => Promise<any> {
    const functionsToBeComposed = sequences.map((sequence: Sequence) => {
        const { type, apply } = sequence;
        try {
            if (type === 'condition') {
                return getConditionalSequences(functionSeeker, sequence);
            }
            const { using, params } = apply;
            const functionToApply = functionSeeker(using);
            if (!functionToApply) {
                return false;
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
        } catch (err) {
            console.error(err);
        }
    });
    return asyncCompose(...functionsToBeComposed);
}

const returns = (returnValue) => () => returnValue;

export const getSequencer = (...sourcesOfFunctions) => (sequence) => async (initialParams) => {
    const functions = [...sourcesOfFunctions, { returns }];
    const fields = getFieldsFunction(getFunctionSeeker(functions));
    const functionSeeker = getFunctionSeeker([ ...functions, { fields } ]);
    const transformer = getTransformer(sequence, functionSeeker);
    return await transformer(initialParams);
};
