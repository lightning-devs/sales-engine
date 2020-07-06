import { getConditioner } from '@lightning/sequences'

// jest.mock('lodash', () => ({ ...jest.requireActual('lodash') }));
// jest.dontMock('lodash');
// const isEmpty = require('lodash/isEmpty');
// import lodash from 'lodash';
// jest.mock('lodash');
// const lodash = jest.requireActual('lodash');

const FALLBACK_RESULT = 'fallback';

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
        when: 'fallback',
        returns: FALLBACK_RESULT
    }
];

const includes = (lookupStr) => (str) => str.includes(lookupStr);

describe('Conditioner Testing', () => {

    let conditioner;

    beforeEach(() => {
        conditioner = getConditioner({ includes })({ cases });
    })

    it('Enter to fallback', () => {
        const FALLBACK = 'hola';
        const result = conditioner(FALLBACK);
        console.log('result', result);
        expect(result).toBeTruthy();
        expect(result.currentValue).toBe(FALLBACK_RESULT);
    })
})