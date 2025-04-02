import { IModel } from "./model";

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
    inBasket: boolean;
}

/**
 * Интерфейс для модели каталога товаров
 *
 * @property {IProduct[]} data - список товаров
 * @method loadProducts - загрузка списка товаров
 * @returns {Promise<IProduct[]>} - промис, возвращающий список товаров
 */
export interface ICatalogModel extends IModel<IProduct[]> {
    loadProducts(): Promise<IProduct[]>;
}
