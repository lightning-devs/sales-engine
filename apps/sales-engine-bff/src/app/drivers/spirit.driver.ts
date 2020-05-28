import { Driver } from '@lightning/typing';

export const SpiritDriver: Driver = {
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
                queryPath: '.item-title',
                getBy: 'text'
            },
            price: {
                queryPath: '.PricesalesPrice',
                getBy: 'text',
                transformationSequence: [
                    { type: 'expression', apply: { using: 'split', params: [' '] } },
                    { type: 'expression', apply: { using: 'last' } },
                ],
            },
            image: {
                queryPath: '.img-panel .browseProductImage',
                getBy: 'attribute',
                propertyPath: 'src',
                transformationSequence: [
                    { type: 'expression', apply: { using: 'appendStart', params: ['https://www.spiritcomputacion.com/'] }}
                ]
            }
        }
    }
}
