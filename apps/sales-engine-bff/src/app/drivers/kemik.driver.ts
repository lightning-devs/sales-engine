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
                queryPath: '.box-image .image-zoom .size-woocommerce_thumbnail',
                getBy: 'attribute',
                propertyPath: 'title'
            },
            price: {
                queryPath: '.box-text .price-wrapper',
                getBy: 'text',
                transformationSequence: [
                    { type: 'expression', apply: { using: 'trim' } },
                    { type: 'expression', apply: { using: 'split', params: [' '] }},
                    { type: 'expression', apply: { using: 'last' }},
                    { type: 'expression', apply: { using: 'replace', params: ['Q', ''] } }
                ]
            },
            image: {
                queryPath: '.box-image .image-zoom .size-woocommerce_thumbnail',
                getBy: 'attribute',
                propertyPath: 'srcset',
                transformationSequence: [
                    { type: 'condition', apply: { using: 'includes', params: [' '] } },
                    { type: 'expression', apply: { using: 'split', params: [' '] } },
                    { type: 'expression', apply: { using: 'first' } }
                ]
            },
        }
    }
}
