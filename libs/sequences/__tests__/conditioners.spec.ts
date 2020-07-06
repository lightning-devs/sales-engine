import { getConditioner } from '@lightning/sequences'
import { fp } from 'lodash';

// jest.mock('lodash', () => ({ ...jest.requireActual('lodash') }));
// jest.dontMock('lodash');
// const isEmpty = require('lodash/isEmpty');
// import lodash from 'lodash';
jest.mock('lodash');
const lodash = jest.requireActual('lodash');

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
]

describe('Conditioner Testing', () => {

    const sourceFunctions = [fp];
    let conditioner;

    beforeEach(() => {
        conditioner = getConditioner(sourceFunctions)({ cases });
    })

    it('Enter to fallback', () => {
        const FALLBACK = 'hola';

        expect(conditioner(FALLBACK)).toBe(FALLBACK_RESULT);
    })
})