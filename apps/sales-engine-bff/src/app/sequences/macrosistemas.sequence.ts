const macrosistemasFields = {
    name: {
        sequence: [
            { type: 'expression', apply: { using: 'select', params: ['.product-inner .title-panel .item-title'] }},
            { type: 'expression', apply: { using: 'getText'}}
        ],
    },
    price: {
        sequence: [
            { type: 'expression', apply: { using: 'select', params: ['.product-inner .details-panel .product-price span'] }},
            { type: 'expression', apply: { using: 'getText'}},
            { type: 'expression', apply: { using: 'replace', params: ['Q ', '']}}
        ],
    },
    image: {
        sequence: [
            { type: 'expression', apply: { using: 'select', params: ['.product-inner .img-panel .imgproduct'] }},
            { type: 'expression', apply: { using: 'getAttribute', params: ['src'] }},
            { type: 'expression', apply: { using: 'appendStart', params: ['https://www.macrosistemas.com'] }}
        ]
    },
    link: {
        sequence: [
            { type: 'expression', apply: { using: 'select', params: ['.link'] }},
            { type: 'expression', apply: { using: 'getAttribute', params: ['href'] }},
            { type: 'expression', apply: { using: 'appendStart', params: ['https://www.macrosistemas.com'] }}
        ]
    }
}

export const MacroSistemasSequence = {
    id: 'macroSistemas',
    name: 'MacroSistemas',
    sequence: [
        { type: 'expression', apply: { using: 'interpolate', params: ['https://www.macrosistemas.com/component/virtuemart/results,1-24?keyword={keyword}&submit_search=&limitstart=0&option=com_virtuemart&view=category&virtuemart_category_id=0'] } },
        { type: 'expression', apply: { using: 'fetch', params: { method: 'GET' } } },
        { type: 'expression', apply: { using: 'get', params: ['data'] } },
        { type: 'expression', apply: { using: 'parseHtml' }},
        { type: 'expression', apply: { using: 'selectAll', params: '.section-produtcs .product-container' } },
        { type: 'map', apply: { using: 'fields', params: { fieldsSequences: macrosistemasFields } } }
    ]
}
