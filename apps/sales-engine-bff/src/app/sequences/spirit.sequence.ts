const spiritFields = {
    name: {
        sequence: [
            { type: 'expression', apply: { using: 'select', params: ['.item-title']} },
            { type: 'expression', apply: { using: 'getText' } },
        ]
    },
    price: {
        sequence: [
            { type: 'expression', apply: { using: 'select', params: ['.PricesalesPrice']} },
            { type: 'expression', apply: { using: 'getText' } },
            { type: 'expression', apply: { using: 'split', params: [' '] } },
            { type: 'expression', apply: { using: 'last' } },
        ],
    },
    image: {
        sequence: [
            { type: 'expression', apply: { using: 'select', params: ['.img-panel .browseProductImage'] }},
            { type: 'expression', apply: { using: 'getAttribute', params: ['src'] }},
            { type: 'expression', apply: { using: 'appendStart', params: ['https://www.spiritcomputacion.com'] }}
        ]
    }
};

export const SpiritSequence = {
    id: 'spirit',
    name: 'Spirit Computacion',
    sequence: [
        { type: 'expression', apply: { using: 'interpolate', params: ['https://www.spiritcomputacion.com/component/virtuemart/?virtuemart_category_id=0&keyword={keyword}&submit_search=&limitstart=0&option=com_virtuemart&view=category'] } },
        { type: 'expression', apply: { using: 'fetch', params: { method: 'GET' } } },
        { type: 'expression', apply: { using: 'get', params: ['data'] } },
        { type: 'expression', apply: { using: 'parseHtml' }},
        { type: 'expression', apply: { using: 'selectAll', params: '.list .product-container' } },
        { type: 'map', apply: { using: 'fields', params: { fieldsSequences: spiritFields } } }
    ]
}
