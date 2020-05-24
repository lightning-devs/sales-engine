const { parse } = require('node-html-parser');

const fs = require('fs')
const path = require('path')

const guatique = fs.readFileSync(path.resolve(__dirname, 'guatique.html'), 'utf8')

const list = parse(guatique);
const orders = list.querySelectorAll('#JS_main_product_list .JSproductListItems .JS_product');

const ordersValues = orders.map(order => {
    const name = order.getAttribute('name');
    const price = order.getAttribute('price');
    const image = order.querySelector('.prod_img .wrapImg2 .responsive-image').getAttribute('data-src');
    return { name, price, image };
})

console.log(ordersValues);


// orders.forEach(item => {
//     const price 
// })

// #JS_main_product_list
//    .JSproductListItems