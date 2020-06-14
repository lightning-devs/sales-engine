import { Driver } from '@lightning/typing';

export const GuatiqueDriver = {
    id: 'guatique',
    name: 'Guatique',
    type: 'html',
    search: {
        baseUrl: 'https://www.guatique.com/es/buscar/search:{keyword}',
        method: 'GET',
        requiredParams: ['keyword'],
    },
    productsDefinition: {
        queryPath: '#JS_main_product_list .JSproductListItems .JS_product',
        fields: {
            name: {
                transformationSequence: [
                    { type: 'expression', apply: { using: 'getAttribute', params: ['name'] }}
                ],
            },
            price: {
                transformationSequence: [
                    { type: 'expression', apply: { using: 'getAttribute', params: ['price'] }}
                ],
            },
            image: {
                transformationSequence: [
                    { type: 'expression', apply: { using: 'select', params: ['.prod_img .wrapImg2 .responsive-image'] }},
                    { type: 'expression', apply: { using: 'getAttribute', params: ['data-src'] }}
                ]
            },
            link: {
                transformationSequence: [
                    { type: 'expression', apply: { using: 'select', params: ['.JSproductName'] }},
                    { type: 'expression', apply: { using: 'getAttribute', params: ['href'] }},
                    { type: 'expression', apply: { using: 'appendStart', params: ['https://www.guatique.com'] }}
                ]
            }
        }
    }
}
