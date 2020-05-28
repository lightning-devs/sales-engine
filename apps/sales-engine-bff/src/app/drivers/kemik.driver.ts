import { Driver } from '@lightning/typing';

export const KemikDriver: Driver = {
    id: 'kemik',
    name: 'Kemik',
    type: 'html',
    search: {
        baseUrl: 'https://www.kemik.gt/?s={keyword}&post_type=product',
        method: 'GET',
        requiredParams: ['keyword'],
    },
    productsDefinition: {
        queryPath: '.products .col-inner',
        fields: {
            name: {
                transformationSequence: [
                    { type: 'expression', apply: { using: 'select', params: ['.box-image .image-zoom .size-woocommerce_thumbnail'] }},
                    { type: 'expression', apply: { using: 'getAttribute', params: ['title'] }},
                ]
            },
            price: {
                transformationSequence: [
                    { type: 'expression', apply: { using: 'select', params: ['.box-text .price-wrapper'] }},
                    { type: 'expression', apply: { using: 'getText' }},
                    { type: 'expression', apply: { using: 'trim' } },
                    { type: 'expression', apply: { using: 'split', params: [' '] }},
                    { type: 'expression', apply: { using: 'last' }},
                    { type: 'expression', apply: { using: 'replace', params: ['Q', ''] } }
                ]
            },
            image: {
                transformationSequence: [
                    { type: 'expression', apply: { using: 'select', params: ['.box-image .image-zoom .size-woocommerce_thumbnail'] }},
                    { type: 'expression', apply: { using: 'getAttribute', params: ['srcset'] }},
                    { type: 'condition', apply: { using: 'includes', params: [' '] } },
                    { type: 'expression', apply: { using: 'split', params: [' '] } },
                    { type: 'expression', apply: { using: 'first' } }
                ]
            },
        }
    }
}
