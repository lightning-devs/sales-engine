export interface Search {
    baseUrl: string;
    method: 'POST' | 'GET';
    headers?: {
        [key: string]: string | number;
    };
    body?: {
        [key: string]: string  | number;
    };
    requiredParams?: string[];
}
