import { getConditioner } from '@lightning/sequences'

// jest.mock('lodash', () => ({ ...jest.requireActual('lodash') }));
// jest.dontMock('lodash');
// const isEmpty = require('lodash/isEmpty');
// import lodash from 'lodash';
// jest.mock('lodash');
// const lodash = jest.requireActual('lodash');

const FALLBACK_RESULT = 'fallback';
const OR_RESULT = 'the value is a price';

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
        when: 'fallback',
        returns: FALLBACK_RESULT
    }
];

// const includes = (lookupStr) => (str) => str.includes(lookupStr);
const includes = jest.requireActual('lodash/fp/includes');

describe('Conditioner Testing', () => {

    let conditioner;

    beforeAll(() => {
        conditioner = getConditioner(...[{ includes }])({ cases });
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
})