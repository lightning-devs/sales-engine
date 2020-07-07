const pacifikoFields = {
    name: {
        sequence: [
            { type: 'expression', apply: { using: 'select', params: ['.right-block .price a'] }},
            { type: 'expression', apply: { using: 'getAttribute', params: ['title'] }},
        ]
    },
    price: {
        sequence: [
            { type: 'expression', apply: { using: 'select', params: ['.right-block .price .price-new']} },
            { type: 'expression', apply: { using: 'getText' } },
            { type: 'expression', apply: { using: 'replace', params: ['Q', ''] } },
            { type: 'expression', apply: { using: 'clean' }},
            { type: 'expression', apply: { using: 'replace', params: [' ', ''] }}
        ],
    },
    image: {
        sequence: [
            { type: 'expression', apply: { using: 'select', params: ['.left-block .product-image-container .img-responsive'] }},
            { type: 'expression', apply: { using: 'getAttribute', params: ['data-src'] }},
        ]
    }
};

export const PacifikoSequence = {
    id: 'pacifiko',
    name: 'Pacifiko',
    sequence: [
        { type: 'expression', apply: { using: 'interpolate', params: ['https://www.pacifiko.com/index.php?category_id=0&search={keyword}&submit_search=&route=product%2Fsearch'] } },
        { type: 'expression', apply: { using: 'fetch', params: { method: 'GET' } } },
        { type: 'expression', apply: { using: 'get', params: ['data'] } },
        { type: 'expression', apply: { using: 'parseHtml' }},
        { type: 'expression', apply: { using: 'selectAll', params: '.products-list .product-layout .product-item-container' } },
        { type: 'map', apply: { using: 'fields', params: { fieldsSequences: pacifikoFields } } }
    ]
}
