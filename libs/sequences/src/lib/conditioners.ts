import { ConditionalCase, Conditioner } from '@lightning/typing';
import lodash from 'lodash';
import { isEmpty, flow } from 'lodash';
import { getFunctionSeeker } from './functionSeeker';

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

/*
const logs = (func) => (...params) => {
    console.log('===> logs params: ', params);
    const val = func(...params);
    console.log('===> logs returned values', params);
    return val;
}
*/

const getConditionalPredicate = (conditioners: Conditioner[], functionSeeker: FunctionSeeker) => {
    if (isEmpty(conditioners)) throw new Error('The "when" clause must have at least 1 conditioner.')
    const conditionersToCompose = conditioners.map((conditioner) => {
        const conditionerKeys = Object.keys(conditioner);
        if (conditionerKeys.length > 2) throw new Error('There to many properties on the conditional case');
        if (conditionerKeys.length === 0) throw new Error('Some conditioners don\'t have the right amount of parameters');
        const [relation, value] = Object.entries(conditioner).find(([key]) => allRelations.includes(key));
        const [, params = []] = Object.entries(conditioner).find(([key]) => paramProperties.includes(key)) || [];
        const functionToApply = functionSeeker(value as string) || (() => val => val);
        const partialFunction = isEmpty(params) ? functionToApply : functionToApply(...params);
        const shouldNegateBoolean = allNegatedRelations.includes(relation);
        const isOrRelation = allOrRelations.includes(relation);
        const isAndRelation = allAndRelations.includes(relation);
        return (currentParameters) => {
            const { currentBoolean, currentValue } = currentParameters;
            // if the last iteration returns "false" and the next one uses an AND boolean relation
            // it should return the current parameters
            if (!currentBoolean && isAndRelation) return currentParameters;

            const gottenBoolean = partialFunction(currentValue);
            if (typeof gottenBoolean !== 'boolean') return currentParameters;
            const actualBoolean = shouldNegateBoolean ? !gottenBoolean : gottenBoolean;
            let nextBoolean = actualBoolean;
            if (isOrRelation) nextBoolean = currentBoolean || actualBoolean;
            if (isAndRelation) nextBoolean = currentBoolean && actualBoolean;
            return { currentBoolean: nextBoolean, currentValue };
        }
    }, []);
    return flow((currentValue) => ({ currentBoolean: false, currentValue }), ...conditionersToCompose);
}

export const getConditioner = (...sourceFunctions) => (conditionalSequence: { cases: ConditionalCase[] }) => {
    const { cases: conditionalCases = [] } = conditionalSequence;
    const functionSeeker = getFunctionSeeker(sourceFunctions);
    return (initialValues) => {
        const successCase = conditionalCases.find(conditionalCase => {
            const { when } = conditionalCase;
            if (when === 'fallback') return true;
            const whenPredicate = getConditionalPredicate(when, functionSeeker);
            const { currentBoolean } = whenPredicate(initialValues);
            return currentBoolean;
        });
        if (isEmpty(successCase)) return null;
        if (isEmpty(successCase.returns)) throw new Error('Every conditional case must have a "returns" property.');
        return {
            initialValues,
            currentValue: successCase.returns,
        }
    }
}
