/**
 * Тип для ответа от сервера на запрос списка элементов
 *
 * @property {number} total - общее количество элементов
 * @property {Type[]} items - список элементов
 */
export type ApiListResponse<Type> = {
    total: number,
    items: Type[]
};

/**
 * Типы запросов к серверу
 */
export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';

/**
 * API - класс для работы с API
 *
 * @property {string} baseUrl - url, к которому будут добавляться пути запросов
 * @property {RequestInit} options - параметры запросов
 */
export class Api {
    readonly baseUrl: string;
    protected options: RequestInit;

    /**
     * @param {string} baseUrl - url, к которому будут добавляться пути запросов
     * @param {RequestInit} options - параметры запросов
     */
    constructor(baseUrl: string, options: RequestInit = {}) {
        this.baseUrl = baseUrl;
        this.options = {
            headers: {
                'Content-Type': 'application/json',
                ...(options.headers as object ?? {})
            }
        };
    }

    /**
     * Обработчик ответа от сервера
     *
     * @param {Response} response - ответ от сервера
     * @returns {Promise<object>}
     */
    protected handleResponse(response: Response): Promise<object> {
        if (response.ok) return response.json();
        else return response.json()
            .then(data => Promise.reject(data.error ?? response.statusText));
    }

    /**
     * GET-запрос к серверу
     *
     * @param {string} uri - путь к ресурсу
     * @returns {Promise<object>}
     */
    get(uri: string) {
        return fetch(this.baseUrl + uri, {
            ...this.options,
            method: 'GET'
        }).then(this.handleResponse);
    }

    /**
     * POST-запрос к серверу
     *
     * @param {string} uri - путь к ресурсу
     * @param {object} data - данные, отправляемые на сервер
     * @param {ApiPostMethods} method - тип запроса (POST, PUT, DELETE)
     * @returns {Promise<object>}
     */
    post(uri: string, data: object, method: ApiPostMethods = 'POST') {
        return fetch(this.baseUrl + uri, {
            ...this.options,
            method,
            body: JSON.stringify(data)
        }).then(this.handleResponse);
    }
}

