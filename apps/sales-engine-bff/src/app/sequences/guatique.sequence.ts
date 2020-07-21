import { Store } from '@lightning/typing';

const guatiqueFields = {
    name: {
        sequence: [
            { type: 'expression', apply: { using: 'getAttribute', params: ['name'] }}
        ],
    },
    price: {
        sequence: [
            { type: 'expression', apply: { using: 'getAttribute', params: ['price'] }}
        ],
    },
    image: {
        sequence: [
            { type: 'expression', apply: { using: 'select', params: ['.prod_img .wrapImg2 .responsive-image'] }},
            { type: 'expression', apply: { using: 'getAttribute', params: ['data-src'] }}
        ]
    },
    link: {
        sequence: [
            { type: 'expression', apply: { using: 'select', params: ['.JSproductName'] }},
            { type: 'expression', apply: { using: 'getAttribute', params: ['href'] }},
            { type: 'expression', apply: { using: 'appendStart', params: ['https://www.guatique.com'] }}
        ]
    }
};

const logo = 'https://scontent.fyvr1-1.fna.fbcdn.net/v/t1.0-9/p960x960/71513169_143902897000293_4047951657948938240_o.png?_nc_cat=102&_nc_sid=85a577&_nc_aid=0&_nc_ohc=HM0Xq81m8DYAX_KELtR&_nc_ht=scontent.fyvr1-1.fna&oh=0afe84304789d2c85a1c959002f75aa3&oe=5F39C0F3';

export const GuatiqueStore: Store = {
    id: 'guatique',
    name: 'Guatique',
    logo,
    color: '#18bcd1',
    link: 'https://www.guatique.com/es',
    sequence: [
        { type: 'expression', apply: { using: 'interpolate', params: ['https://www.guatique.com/es/buscar/search:{keyword}'] } },
        { type: 'expression', apply: { using: 'fetch', params: { method: 'GET' } } },
        { type: 'expression', apply: { using: 'get', params: ['data'] } },
        { type: 'expression', apply: { using: 'parseHtml' }},
        { type: 'expression', apply: { using: 'selectAll', params: '#JS_main_product_list .JSproductListItems .JS_product' } },
        { type: 'map', apply: { using: 'fields', params: { fieldsSequences: guatiqueFields } } }
    ]
}
