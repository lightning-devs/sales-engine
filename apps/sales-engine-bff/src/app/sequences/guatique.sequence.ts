const guatiqueFields = {
    name: {
        sequence: [
            { type: 'expression', apply: { using: 'getAttribute', params: ['name'] }}
        ],
    },
    price: {
        sequence: [
            { type: 'expression', apply: { using: 'getAttribute', params: ['price'] }}
        ],
    },
    image: {
        sequence: [
            { type: 'expression', apply: { using: 'select', params: ['.prod_img .wrapImg2 .responsive-image'] }},
            { type: 'expression', apply: { using: 'getAttribute', params: ['data-src'] }}
        ]
    },
    link: {
        sequence: [
            { type: 'expression', apply: { using: 'select', params: ['.JSproductName'] }},
            { type: 'expression', apply: { using: 'getAttribute', params: ['href'] }},
            { type: 'expression', apply: { using: 'appendStart', params: ['https://www.guatique.com'] }}
        ]
    }
};

export const GuatiqueSequence = {
    id: 'guatique',
    name: 'Guatique',
    sequence: [
        { type: 'expression', apply: { using: 'interpolate', params: ['https://www.guatique.com/es/buscar/search:{keyword}'] } },
        { type: 'expression', apply: { using: 'fetch', params: { method: 'GET' } } },
        { type: 'expression', apply: { using: 'get', params: ['data'] } },
        { type: 'expression', apply: { using: 'parseHtml' }},
        { type: 'expression', apply: { using: 'selectAll', params: '#JS_main_product_list .JSproductListItems .JS_product' } },
        { type: 'map', apply: { using: 'fields', params: { fieldsSequences: guatiqueFields } } }
    ]
}
