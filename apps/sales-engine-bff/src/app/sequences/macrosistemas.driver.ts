import { Driver } from '@lightning/typing';

export const MacroSistemasDriver = {
    id: 'macrosistemas',
    name: 'Macro Sistemas',
    type: 'json',
    search: {
        baseUrl: 'https://www.macrosistemas.com/component/virtuemart/',
        method:'POST',
        headers: {
            'Accept': 'application/json, text/javascript, */*; q=0.01',
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'Host': 'www.macrosistemas.com',
            'Origin': 'https://www.macrosistemas.com',
            'X-Requested-With': 'XMLHttpRequest'
        },
        body: {
            "is_ajax_searchpro": 1,
            "search_module_id": 97,
            "search_category_id": 0,
            "search_name": "monitor"
        },
        requiredParams: ['keyword']
    }
}
