// import reduce from 'awaity/esm/fp';
const { reduce } = require('awaity/fp');

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

(async function test() {
    const plusOneDelayed = (val) => {
        return new Promise((resolve, reject) => {
           setTimeout(() => {
               resolve(val + 1);
           }, 10000)
        });
    }
    const functions = [plusOneDelayed, (val => val * 3) ];
    const composed = asyncCompose(...functions);

    console.log(await composed(2));
})();

/* const getFieldsFunction = (functionSeeker: FunctionSeeker) => ({ fieldsSequences } : { fieldsSequences: Array<FieldDefinition> }) => {
    const fieldsTransformers = Object.entries(fieldsSequences).reduce((fieldOperators, [key, fieldDefinition]) => {
        const { sequence } = fieldDefinition;
        const transformer = !isEmpty(sequence) && (getTransformer(sequence, functionSeeker));
        const operator = (itemValue) => {
            if (!transformer) return 'Sequence Required';
            const transformedValue = transformer(itemValue);
            return isEmpty(transformedValue) ? '' : transformedValue;
        }
        fieldOperators[key] = operator || (() => '');
        return fieldOperators;
    }, {});
    return element => {
        return Object.keys(fieldsTransformers).reduce((acc, key) => {
            acc[key] = fieldsTransformers[key](element);
            return acc;
        }, {});
    }
} */
