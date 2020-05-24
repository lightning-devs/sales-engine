import { Driver } from '@lightning/typing';

export const GuatiqueDriver: Driver = {
    id: 'guatique',
    name: 'Guatique',
    search: {
        type: 'html',
        baseUrl: 'https://www.guatique.com/es/buscar/search:{ keyword }',
        method: 'GET',
        requiredParams: ['keyword'],
    },
    productsDefinition: {
        queryPath: '#JS_main_product_list .JSproductListItems .JS_product',
        fields: {
            name: {
                attribute: 'name'
            },
            price: {
                attribute: 'price'
            },
            image: {
                query: '.prod_img .wrapImg2 .responsive-image',
                attribute: 'data-src'
            }
        }
    }
}
