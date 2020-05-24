import { Driver } from '@lightning/typing';

export const GuatiqueDriver: Driver = {
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
                propertyPath: 'name'
            },
            price: {
                propertyPath: 'price'
            },
            image: {
                queryPath: '.prod_img .wrapImg2 .responsive-image',
                propertyPath: 'data-src'
            }
        }
    }
}
