import { IProduct } from "./product";

/**
 * Интерфейс для представления элемента корзины
 *
 * @property {string} id - уникальный идентификатор товара
 * @property {string} title - наименование товара
 * @property {number} price - цена товара
 */
export interface IBasketItem extends Pick<IProduct, 'id' | 'title' | 'price' | 'inBasket'> {};

/**
 * Интерфейс для модели корзины
 *
 * @method addItem - добавляет элемент в корзину
 * @param {IBasketItem} item - элемент корзины
 * @method removeItem - удаляет элемент из корзины
 * @param {string} id - уникальный идентификатор элемента корзины
 * @property {number} total - общая сумма корзины
 */
export interface IBasketModel {
    addItem(item: IBasketItem): void;
    removeItem(id: string): void;
    get total(): number;
};

