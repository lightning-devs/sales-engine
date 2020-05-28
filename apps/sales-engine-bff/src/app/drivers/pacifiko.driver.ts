import { Driver } from '@lightning/typing';

export const PacifikoDriver: Driver = {
    id: 'pacifiko',
    name: 'Pacifiko',
    type: 'html',
    search: {
        baseUrl: 'https://www.pacifiko.com/index.php?category_id=0&search={keyword}&submit_search=&route=product%2Fsearch',
        method: 'GET',
        requiredParams: ['keyword']
    },
    productsDefinition: {
        queryPath: '.products-list .product-layout .product-item-container',
        fields: {
            name: {
                queryPath: '.right-block .price a',
                getBy: 'attribute',
                propertyPath: 'title'
            },
            price: {
                queryPath: '.right-block .price .price-new',
                getBy: 'text',
                transformationSequence: [
                    { type: 'expression', apply: { using: 'replace', params: ['Q', ''] } },
                    { type: 'expression', apply: { using: 'clean' }},
                    { type: 'expression', apply: { using: 'replace', params: [' ', ''] }}
                ],
            },
            image: {
                queryPath: '.left-block .product-image-container .img-responsive',
                getBy: 'attribute',
                propertyPath: 'data-src'
            }
        }
    }
}
