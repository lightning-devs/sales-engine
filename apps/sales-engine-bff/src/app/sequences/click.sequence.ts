const clickFields = {
    name: {
        sequence: [
            { type: 'expression', apply: { using: 'select', params: ['.productCaption a textarea']} },
            { type: 'expression', apply: { using: 'getText' } }
        ]
    },
    price: {
        sequence: [
            { type: 'expression', apply: { using: 'selectAll', params: ['.productCaption a label']} },
            { type: 'expression', apply: { using: 'last' } },
            { type: 'expression', apply: { using: 'getText' } },
            { type: 'expression', apply: { using: 'replace', params: ['Q', ''] } }
        ],
    },
    image: {
        sequence: [
            { type: 'expression', apply: { using: 'select', params: ['.productBox .lazyload'] }},
            { type: 'expression', apply: { using: 'getAttribute', params: ['data-srcset'] }},
            { type: 'expression', apply: { using: 'split', params: [','] }},
            { type: 'expression', apply: { using: 'last' }},
            { type: 'expression', apply: { using: 'replace', params: ['\n                                 ', ''] }},
            { type: 'expression', apply: { using: 'split', params: [' '] }},
            { type: 'expression', apply: { using: 'first' }}
        ]
    }
};

export const ClickSequence = {
    id: 'click',
    name: 'Click Guatemala',
    sequence: [
        { type: 'expression', apply: { using: 'interpolate', params: ['https://click.gt/productos/buscar/{keyword}'] } },
        { type: 'expression', apply: { using: 'fetch', params: { method: 'GET' } } },
        { type: 'expression', apply: { using: 'get', params: ['data'] } },
        { type: 'expression', apply: { using: 'parseHtml' }},
        { type: 'expression', apply: { using: 'selectAll', params: '.productsContent .container .row .col-md-3' } },
        { type: 'map', apply: { using: 'fields', params: { fieldsSequences: clickFields } } }
    ]
}
