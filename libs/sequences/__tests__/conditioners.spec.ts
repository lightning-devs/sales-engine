import { getConditioner } from '@lightning/sequences'

const FALLBACK_RESULT = 'fallback';
const OR_RESULT = 'the value is a price';
const AND_IT_RESULT = 'AND_IT_RESULT';

const cases: any = [
    {
        when: [
            { it: 'includes', to: [' '] }
        ],
        // sequence
        returns: [
            { type: 'expression', apply: { using: 'split', params: [' '] } },
            { type: 'expression', apply: { using: 'first' } }
        ]
    },
    {
        when: [
            { it: 'includes', this: ['Q'] },
            { orIt: 'includes', this: ['$'] }
        ],
        returns: OR_RESULT
    },
    {
        when: [
            { it: 'isArray', to: [] },
            { andIt: 'every', to: [String] },
            { andIt: 'includesEvery', to: ['Q. '] }
        ],
        // sequence
        returns: AND_IT_RESULT
    },
    {
        when: 'fallback',
        returns: FALLBACK_RESULT
    }
];

const includes = jest.requireActual('lodash/fp/includes');
const isArray = (val) => Array.isArray(val);
const every = jest.requireActual('lodash/fp/every');
const includesEvery = val => arr => arr.every(item => item.includes(val));

describe('Conditioner Testing', () => {

    let conditioner;

    beforeAll(() => {
        conditioner = getConditioner(...[{ includes, isArray, every, includesEvery }])({ cases });
    });

    describe('Fallback test cases', () => {

        it('Should enter to fallback', () => {
            const INITIAL_VALUES = 'hola';
            const result = conditioner(INITIAL_VALUES);

            expect(result.currentValue).toBe(FALLBACK_RESULT);
        });

        it('Should not enter to fallback', () => {
            const INITIAL_VALUES = ' hola';
            const result = conditioner(INITIAL_VALUES);

            expect(result.currentValue).not.toBe(FALLBACK_RESULT);
        });

    });

    describe('OR Test cases', () => {

        it('Should be a price in quetzales', () => {
            const QUETZAL_INITIAL_VALUES = 'Q.50.00';
            const quetzalResult = conditioner(QUETZAL_INITIAL_VALUES);

            expect(quetzalResult.currentValue).toBe(OR_RESULT);
        });

        it('Should be a price in dollars', () => {
            const DOLLAR_INITIAL_VALUES = '$.50.00';
            const dollarResult = conditioner(DOLLAR_INITIAL_VALUES);

            expect(dollarResult.currentValue).toBe(OR_RESULT);
        });

        it('Should not be a price at all', () => {
            const NOT_A_PRICE_STRING = 'not a price';
            const notAPriceResult = conditioner(NOT_A_PRICE_STRING);

            expect(notAPriceResult.currentValue).not.toBe(OR_RESULT);
        })
    })

    describe('AND Test Cases', () => {

        it('Enters to AND_IT condition', () => {
            const INITIAL_VALUES = ['Q. 10', 'Q. 5', 'Q. 200', 'Q. 500'];
            const result = conditioner(INITIAL_VALUES);

            expect(result.currentValue).toBe(AND_IT_RESULT);
        })

    })
})