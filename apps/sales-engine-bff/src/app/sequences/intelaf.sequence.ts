const intelafFields = {
    name: {
        sequence: [
            { type: 'expression', apply: { using: 'selectAll', params: ['.descripcion div a'] } },
            { type: 'expression', apply: { using: 'first' } },
            { type: 'expression', apply: { using: 'getText' } }
        ]
    },
    price: {
        sequence: [
            { type: 'expression', apply: { using: 'selectAll', params: ['.descripcion div a'] } },
            { type: 'expression', apply: { using: 'get', params: ['1'] } },
            { type: 'expression', apply: { using: 'getText' } },
            { type: 'expression', apply: { using: 'split', params: ['Q']}},
            { type: 'expression', apply: { using: 'last' } }
        ]
    },
    image: {
        sequence: [
            { type: 'expression', apply: { using: 'select', params: ['.area_imagen'] } },
            { type: 'expression', apply: { using: 'getAttribute', params: ['style'] } },
            { type: 'expression', apply: { using: 'split', params: ['(\''] } },
            { type: 'expression', apply: { using: 'get', params: ['1'] } },
            { type: 'expression', apply: { using: 'split', params: ['\')'] } },
            { type: 'expression', apply: { using: 'first' } },
            { type: 'expression', apply: { using: 'appendStart', params: ['https://www.intelaf.com/'] }}
        ]
    }
};

export const IntelafSequence = {
    id: 'intelaf',
    name: 'Intelaf',
    sequence: [
        {
            type: 'expression',
            apply: {
                using: 'interpolate',
                params: {
                    url: 'https://www.intelaf.com/buscar.aspx',
                    data: {
                        "queBuscar": '{keyword}'
                    }
                }
            }
        },
        {
            type: 'expression',
            apply: {
                using: 'fetch',
                params:  {
                    method: 'POST',
                    contentType: 'form-data'
                }
            },
        },
        { type: 'expression', apply: { using: 'get', params: ['data'] } },
        { type: 'expression', apply: { using: 'parseHtml' }},
        { type: 'expression', apply: { using: 'selectAll', params: '.row_productos .col-xs-12' } },
        { type: 'map', apply: { using: 'fields', params: { fieldsSequences: intelafFields } } }
    ]
}
