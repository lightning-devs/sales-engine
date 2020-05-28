import { Driver } from '@lightning/typing';

export const RechDriver: Driver = {
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
                queryPath: '.product-title a',
                getBy: 'text'
            },
            price: {
                queryPath: '.product-price',
                getBy: 'text',
                transformationSequence: [
                    { type: 'expression', apply: { using: 'split', params: [' '] } },
                    { type: 'expression', apply: { using: 'last' } },
                ],
            },
            image: {
                queryPath: '.product-image img',
                getBy: 'attribute',
                propertyPath: 'src',
            }
        }
    }
}
