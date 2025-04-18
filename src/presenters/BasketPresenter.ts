import { EventEmitter } from "../components/base/events";
import { BasketModel } from "../components/models/BasketModel";
import { BasketView } from "../components/views/BasketView";
import { HeaderView } from "../components/views/HeaderView";
import { ModalView } from "../components/views/ModalView";
import { ProductInBasketView } from "../components/views/ProductInBasketView";
import { Events } from "../types/events";
import { IProduct } from "../types/product";
import { cloneTemplate } from "../utils/utils";

export class BasketPresenter {
    constructor(
        private _productsInBasketTemplate: HTMLTemplateElement,
        private _basketModel: BasketModel,
        private _basketView: BasketView,
        private _headerView: HeaderView,
        private _events: EventEmitter
    ) {
        this.subscribe();
    }

    private subscribe(): void {
        this._events.on(Events.BASKET_UPDATE, () => this.changeBasket());
        this._events.on(Events.PRODUCT_REMOVED, (product: IProduct) => this.removeProduct(product));
    }

    private changeBasket(): void {
        this._headerView.counter = this._basketModel.getLength();
        this._basketView.products = this._basketModel.data.items.map((product, index) => {
            const productCard = new ProductInBasketView(
                cloneTemplate(this._productsInBasketTemplate),
                this._events,
                () => this._events.emit(Events.PRODUCT_REMOVED, product)
            );
            return productCard.render({
                index: index,
                title: product.title,
                price: product.price
            });
        });
        this._basketView.total = this._basketModel.data.total;
    }

    private removeProduct(product: IProduct): void {
        this._basketModel.removeItem(product.id);
        this._events.emit(Events.BASKET_OPEN);
    }
}