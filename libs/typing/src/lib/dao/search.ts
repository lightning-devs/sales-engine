export interface Search {
    type: 'html' | 'json';
    baseUrl: string;
    method: 'POST' | 'GET';
    headers: {
        [key: string]: string | number;
    };
    body: {
        [key: string]: string  | number;
    };
    requiredParams?: string[];
}
