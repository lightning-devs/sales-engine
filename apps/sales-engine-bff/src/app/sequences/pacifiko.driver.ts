import { Driver } from '@lightning/typing';

export const PacifikoDriver = {
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
                transformationSequence: [
                    { type: 'expression', apply: { using: 'select', params: ['.right-block .price a'] }},
                    { type: 'expression', apply: { using: 'getAttribute', params: ['title'] }},
                ]
            },
            price: {
                transformationSequence: [
                    { type: 'expression', apply: { using: 'select', params: ['.right-block .price .price-new']} },
                    { type: 'expression', apply: { using: 'getText' } },
                    { type: 'expression', apply: { using: 'replace', params: ['Q', ''] } },
                    { type: 'expression', apply: { using: 'clean' }},
                    { type: 'expression', apply: { using: 'replace', params: [' ', ''] }}
                ],
            },
            image: {
                transformationSequence: [
                    { type: 'expression', apply: { using: 'select', params: ['.left-block .product-image-container .img-responsive'] }},
                    { type: 'expression', apply: { using: 'getAttribute', params: ['data-src'] }},
                ]
            }
        }
    }
}
