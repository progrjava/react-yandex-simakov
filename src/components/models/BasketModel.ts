import { IBasketItem, IBasketModel } from "../../types/basket";
import { IEvents } from "../base/events";
import { Events } from "../../types/events";
import { Model } from "./base/Model";

export class BasketModel extends Model<{ 
    items: IBasketItem[], 
    total: number 
}> implements IBasketModel {
    
    constructor(events: IEvents) {
        super({ items: [], total: 0 }, events);
    }

    getLength(): number {
        return this.data.items.length;
    }

    addItem(newItem: IBasketItem): void {
        if (!this.data.items.find(item => item.id === newItem.id)) {
            this.updateData(data => ({
                items: [...data.items, newItem],
                total: data.total + newItem.price
            }));
            this.emitEvent(Events.BASKET_UPDATE);
        }
    }

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

    get total(): number {
        return this.data.total;
    }

    isProductInBasket(product: IBasketItem): boolean {
        return this.data.items.some(item => item.id === product.id);
    }

    toggleProduct(product: IBasketItem): void {
        this.isProductInBasket(product) 
            ? this.removeItem(product.id) 
            : this.addItem(product);
    }

    clear(): void {
        this.updateData(() => ({ items: [], total: 0 }));
        this.emitEvent(Events.BASKET_UPDATE);
    }
}