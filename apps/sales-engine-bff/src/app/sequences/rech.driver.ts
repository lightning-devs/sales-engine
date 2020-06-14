import { Driver } from '@lightning/typing';

export const RechDriver = {
    id: 'rech',
    name: 'Rech',
    type: 'html',
    search: {
        baseUrl: 'http://rech.com.gt/search.php?key={keyword}',
        method: 'GET',
        requiredParams: ['keyword']
    },
    productsDefinition: {
        queryPath: '.product',
        fields: {
            name: {
                transformationSequence: [
                    { type: 'expression', apply: { using: 'select', params: ['.product-title a']} },
                    { type: 'expression', apply: { using: 'getText' } },
                ]
            },
            price: {
                transformationSequence: [
                    { type: 'expression', apply: { using: 'select', params: ['.product-price']} },
                    { type: 'expression', apply: { using: 'getText' } },
                    { type: 'expression', apply: { using: 'split', params: [' '] } },
                    { type: 'expression', apply: { using: 'last' } },
                ],
            },
            image: {
                transformationSequence: [
                    { type: 'expression', apply: { using: 'select', params: ['.product-image img'] }},
                    { type: 'expression', apply: { using: 'getAttribute', params: ['src'] }},
                ]
            }
        }
    }
}
