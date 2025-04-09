/**
 * Тип категории товара
 */
export type Category = 
    | 'софт-скил'
    | 'хард-скил'
    | 'другое'
    | 'дополнительное'
    | 'кнопка';


/**
 * Интерфейс для представления товара
 *
 * @property {string} id - уникальный идентификатор товара
 * @property {Category} category - категория товара
 * @property {string} title - наименование товара
 * @property {string} description - описание товара
 * @property {string} image - URL изображения товара
 * @property {number} price - цена товара
 * @property {boolean} inBasket - флаг добавления товара в корзину
 */
export interface IProduct {
    id: string;
    category: Category;
    title: string;
    description: string;
    image: string;
    price: number;
}


/**
 * Интерфейс для модели списка товаров
 *
 * @method loadProducts - загрузить список товаров
 * @returns {Promise<void>} - промис, который разрешается после загрузки списка товаров
 * 
 * @method getProductById - загрузить данные товара по id
 * @param {string} id - id товара
 * @returns {Promise<void>} - промис, который разрешается после загрузки товара
 */
export interface ICatalogModel {
    loadProducts(): Promise<void>;
    getProductById(id: string): Promise<void>;
}

