import { Driver } from '@lightning/typing';

const rechFields = {
    name: {
        sequence: [
            { type: 'expression', apply: { using: 'select', params: ['.product-title a']} },
            { type: 'expression', apply: { using: 'getText' } },
        ]
    },
    price: {
        sequence: [
            { type: 'expression', apply: { using: 'select', params: ['.product-price']} },
            { type: 'expression', apply: { using: 'getText' } },
            { type: 'expression', apply: { using: 'split', params: [' '] } },
            { type: 'expression', apply: { using: 'last' } },
        ],
    },
    image: {
        sequence: [
            { type: 'expression', apply: { using: 'select', params: ['.product-image img'] }},
            { type: 'expression', apply: { using: 'getAttribute', params: ['src'] }},
        ]
    }
};

export const RechDriver = {
    id: 'rech',
    name: 'Rech',
    sequence: [
        { type: 'expression', apply: { using: 'interpolate', params: ['http://rech.com.gt/search.php?key={keyword}'] } },
        { type: 'expression', apply: { using: 'fetch', params: { method: 'GET' } } },
        { type: 'expression', apply: { using: 'get', params: ['data'] } },
        { type: 'expression', apply: { using: 'parseHtml' }},
        { type: 'expression', apply: { using: 'selectAll', params: '.product' } },
        { type: 'map', apply: { using: 'fields', params: { fieldsSequences: rechFields } } }
    ]
}
