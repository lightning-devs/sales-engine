import { Driver } from '@lightning/typing';
import { Product } from '@lightning/typing';
import { parse } from 'node-html-parser';

export default class HTMLResolver {
    static resolve = (driver: Driver) => (data: any) => {
        // parse the html data
        const html: any = parse(data);

        const { productsDefinition } = driver;
        const { queryPath, fields } = productsDefinition;

        const items = html.querySelectorAll(queryPath);

        const products: Product[] = items.map(item => {
            const product: Product = {
                name: '',
                price: 0,
                image: '',
                link: ''
            };

            Object.entries(fields).forEach(([key, value]) => {

                // join field value with a static pre-defined value
                // e.x. join domain + product link
                const { fieldBase } = value;
                let val = fieldBase || '';

                val += fieldBase + value.hasOwnProperty('queryPath') ? item.querySelector(value.queryPath).getAttribute(value.propertyPath) : item.getAttribute(value.propertyPath);

                product[key] = val;
            });

            return product;
        });

        return products;
    }
}
