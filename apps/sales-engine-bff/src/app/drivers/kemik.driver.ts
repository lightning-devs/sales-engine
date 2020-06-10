import { Driver } from '@lightning/typing';

const kemikFields = {
    name: {
        sequence: [
            { type: 'expression', apply: { using: 'select', params: ['.box-image .image-zoom .size-woocommerce_thumbnail'] }},
            { type: 'expression', apply: { using: 'getAttribute', params: ['title'] }},
        ]
    },
    price: {
        sequence: [
            { type: 'expression', apply: { using: 'select', params: ['.box-text .price-wrapper'] }},
            { type: 'expression', apply: { using: 'getText' }},
            { type: 'expression', apply: { using: 'trim' } },
            { type: 'expression', apply: { using: 'split', params: [' '] }},
            { type: 'expression', apply: { using: 'last' }},
            { type: 'expression', apply: { using: 'replace', params: ['Q', ''] } }
        ]
    },
    image: {
        sequence: [
            { type: 'expression', apply: { using: 'select', params: ['.box-image .image-zoom .size-woocommerce_thumbnail'] }},
            { type: 'expression', apply: { using: 'getAttribute', params: ['srcset'] }},
            { type: 'condition', apply: { using: 'includes', params: [' '] } },
            { type: 'expression', apply: { using: 'split', params: [' '] } },
            { type: 'expression', apply: { using: 'first' } }
        ]
    },
};

export const KemikDriver: Driver = {
    id: 'kemik',
    name: 'Kemik',
    // types are no longer necessary
    // type: 'html',
    sequence: [
        { type: 'expression', apply: { using: 'interpolate', params: ['https://www.kemik.gt/?s={keyword}&post_type=product'] } },
        { type: 'expression', apply: { using: 'fetch', params: { method: 'GET' } } },
        { type: 'expression', apply: { using: 'get', params: ['data'] } },
        { type: 'expression', apply: { using: 'html-parse' }},
        { type: 'expression', apply: { using: 'selectAll', params: '.products .col-inner' } },
        { type: 'map', apply: { using: 'fields', params: { fieldSequences: kemikFields } } }
    ]
}
