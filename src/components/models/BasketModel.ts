import { IBasketItem, IBasketModel } from "../../types/basket";
import { IEvents } from "../base/events";
import { Events } from "../../types/events";
import { Model } from "./base/Model";

/**
 * Модель корзины
 *
 * @class BasketModel
 * @implements IBasketModel
 */
export class BasketModel extends Model<{ 
    items: IBasketItem[], 
    total: number 
}> implements IBasketModel {
    
    /**
     * @constructor
     * @param {IEvents} events - объект событий
     */
    constructor(events: IEvents) {
        super({ items: [], total: 0 }, events);
    }

    /**
     * Возвращает количество товаров в корзине
     * @returns {number}
     */
    getLength(): number {
        return this.data.items.length;
    }

    /**
     * Добавляет товар в корзину
     * @param {IBasketItem} newItem - товар, который нужно добавить
     */
    addItem(newItem: IBasketItem): void {
        if (!this.data.items.find(item => item.id === newItem.id)) {
            this.updateData(data => ({
                items: [...data.items, newItem],
                total: data.total + newItem.price
            }));
            this.emitEvent(Events.BASKET_UPDATE);
        }
    }

    /**
     * Удаляет товар из корзины
     * @param {string} id - уникальный идентификатор товара
     */
    removeItem(id: string): void {
        const item = this.data.items.find(item => item.id === id);
        if (item) {
            this.updateData(data => ({
                items: data.items.filter(item => item.id !== id),
                total: data.total - item.price
            }));
            this.emitEvent(Events.BASKET_UPDATE);
        }
    }

    /**
     * Возвращает общую сумму товаров в корзине
     * @returns {number}
     */
    get total(): number {
        return this.data.total;
    }

    /**
     * Проверяет, есть ли товар в корзине
     * @param {IBasketItem} product - товар, который нужно проверить
     * @returns {boolean}
     */
    isProductInBasket(product: IBasketItem): boolean {
        return this.data.items.some(item => item.id === product.id);
    }

    /**
     * Переключает товар в корзине
     * @param {IBasketItem} product - товар, который нужно переключить
     */
    toggleProduct(product: IBasketItem): void {
        this.isProductInBasket(product) 
            ? this.removeItem(product.id) 
            : this.addItem(product);
    }

    /**
     * Очищает корзину
     */
    clear(): void {
        this.updateData(() => ({ items: [], total: 0 }));
        this.emitEvent(Events.BASKET_UPDATE);
    }
}
