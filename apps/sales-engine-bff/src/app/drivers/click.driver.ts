import { Driver } from '@lightning/typing';

export const ClickDriver: Driver = {
    id: 'click',
    name: 'Click Guatemala',
    type: 'html',
    search: {
        baseUrl: 'https://click.gt/productos/buscar/{keyword}',
        method: 'GET',
        requiredParams: ['keyword']
    },
    productsDefinition: {
        queryPath: '.productsContent .container .row .col-md-3',
        fields: {
            name: {
                queryPath: '.productCaption a textarea',
                getBy: 'text'
            },
            /*price: {
                queryPath: '.productCaption a label',
                getBy: 'text',
                transformationSequence: [
                    { type: 'expression', apply: { using: 'split', params: ['Q'] } },
                    { type: 'expression', apply: { using: 'last' } },
                ],
            },*/
            image: {
                queryPath: '.productBox .lazyload',
                getBy: 'attribute',
                propertyPath: 'data-srcset',
                transformationSequence: [
                    { type: 'expression', apply: { using: 'split', params: [','] }},
                    { type: 'expression', apply: { using: 'last' }},
                    { type: 'expression', apply: { using: 'replace', params: ['\n                                 ', ''] }},
                    { type: 'expression', apply: { using: 'split', params: [' '] }},
                    { type: 'expression', apply: { using: 'first' }}
                ]
            }
        }
    }
}
