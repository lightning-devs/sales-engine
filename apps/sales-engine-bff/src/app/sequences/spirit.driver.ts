import { Driver } from '@lightning/typing';

export const SpiritDriver = {
    id: 'spirit',
    name: 'Spirit Computacion',
    type: 'html',
    search: {
        baseUrl: 'https://www.spiritcomputacion.com/component/virtuemart/?virtuemart_category_id=0&keyword={keyword}&submit_search=&limitstart=0&option=com_virtuemart&view=category',
        method: 'GET',
        requiredParams: ['keyword']
    },
    productsDefinition: {
        queryPath: '.list .product-container',
        fields: {
            name: {
                transformationSequence: [
                    { type: 'expression', apply: { using: 'select', params: ['.item-title']} },
                    { type: 'expression', apply: { using: 'getText' } },
                ]
            },
            price: {
                transformationSequence: [
                    { type: 'expression', apply: { using: 'select', params: ['.PricesalesPrice']} },
                    { type: 'expression', apply: { using: 'getText' } },
                    { type: 'expression', apply: { using: 'split', params: [' '] } },
                    { type: 'expression', apply: { using: 'last' } },
                ],
            },
            image: {
                transformationSequence: [
                    { type: 'expression', apply: { using: 'select', params: ['.img-panel .browseProductImage'] }},
                    { type: 'expression', apply: { using: 'getAttribute', params: ['src'] }},
                    { type: 'expression', apply: { using: 'appendStart', params: ['https://www.spiritcomputacion.com'] }}
                ]
            }
        }
    }
}
