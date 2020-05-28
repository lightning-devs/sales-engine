const { parse } = require('node-html-parser');
const fp = require('lodash/fp');

const fs = require('fs')
const path = require('path')

const guatique = fs.readFileSync(path.resolve(__dirname, 'guatique.html'), 'utf8')

const list = parse(guatique);

const orders = list.querySelectorAll('.product');

const orderValues = orders.map(order => {
    const name = order.querySelector('.product-title a').text.split('\r\n').map(s => s.trim()).join(' ');
    const price = order.querySelector('.product-price').text;
    const image = order.querySelector('.product-image img').getAttribute('src');
    return { name, price, image };
});

console.log(orderValues);

/*
// Kemik Test

const orders = list.querySelectorAll('.products .col-inner');

const ordersValues = orders.map(order => {

    const name = order.querySelector('.box-image .image-zoom .size-woocommerce_thumbnail')
        .getAttribute('title');

    const priceElement = order.querySelector('.box-text .price-wrapper');
    const price = last(priceElement.text.trim().split('Q'));

    let image = order.querySelector('.box-image .image-zoom .size-woocommerce_thumbnail')
        .getAttribute('srcset');
    if (image.includes(' ')) {
        image = image.split(' ')[0];
    }

    return { name, image, price };
})

console.log(ordersValues);
*/

/*
// Guatique Test

const orders = list.querySelectorAll('#JS_main_product_list .JSproductListItems .JS_product');

const ordersValues = orders.map(order => {
    const name = order.getAttribute('name');
    const price = order.getAttribute('price');
    const image = order.querySelector('.prod_img .wrapImg2 .responsive-image').getAttribute('data-src');
    return { name, price, image };
})
console.log(ordersValues);*/


// orders.forEach(item => {
//     const price
// })

// #JS_main_product_list
//    .JSproductListItems
