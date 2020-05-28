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
                transformationSequence: [
                    { type: 'expression', apply: { using: 'select', params: ['.productCaption a textarea']} },
                    { type: 'expression', apply: { using: 'getText' } }
                ]
            },
            price: {
                transformationSequence: [
                    { type: 'expression', apply: { using: 'selectAll', params: ['.productCaption a label']} },
                    { type: 'expression', apply: { using: 'last' } },
                    { type: 'expression', apply: { using: 'getText' } },
                    { type: 'expression', apply: { using: 'replace', params: ['Q', ''] } }
                ],
            },
            image: {
                transformationSequence: [
                    { type: 'expression', apply: { using: 'select', params: ['.productBox .lazyload'] }},
                    { type: 'expression', apply: { using: 'getAttribute', params: ['data-srcset'] }},
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
