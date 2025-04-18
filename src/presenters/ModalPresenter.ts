import { EventEmitter } from "../components/base/events";
import { BasketModel } from "../components/models/BasketModel";
import { OrderModel } from "../components/models/OrderModel";
import { BasketView } from "../components/views/BasketView";
import { ContactsFormView } from "../components/views/ContactsFormView";
import { DeliveryFormView } from "../components/views/DeliveryFormView";
import { ModalView } from "../components/views/ModalView";
import { PageView } from "../components/views/PageView";
import { ProductView } from "../components/views/ProductView";
import { Events } from "../types/events";
import { IProduct } from "../types/product";
import { cloneTemplate, isEmpty } from "../utils/utils";

export class ModalPresenter {
    constructor(
        private _productPreviewTemplate: HTMLTemplateElement,
        private _basketModel: BasketModel,
        private _orderModel: OrderModel,
        private _basketView: BasketView,
        private _pageView: PageView,
        private _modalView: ModalView,
        private _contactsFormView: ContactsFormView,
        private _deliveryFormView: DeliveryFormView,
        private _events: EventEmitter
    ) {
        this.subscribe();
    }

    private subscribe(): void {
        this._events.on(Events.BASKET_OPEN, () => this.openBasket());
        this._events.on(Events.PRODUCT_PREVIEW, (product: IProduct) => this.showProductPreview(product));
        this._events.on(Events.MODAL_CLOSE, () => this.changeModal(false));
        this._events.on(Events.MODAL_OPEN, () => this.changeModal(true));
        this._events.on(Events.ORDER_DELIVERY_FORM_OPEN, () => this.renderForm('delivery'));
        this._events.on(Events.ORDER_DELIVERY_FORM_SUBMIT, () => this.renderForm('contacts'));
    }

    private openBasket(): void {
        this._modalView.render({
            content: this._basketView.render({enabled: this._basketModel.getLength() > 0})
        });
    }

    private showProductPreview(product: IProduct): void {
        const productPreview = new ProductView(
            'card',
            cloneTemplate(this._productPreviewTemplate),
            this._events,
            () => {
                this._basketModel.toggleProduct(product);
                this._events.emit(Events.PRODUCT_PREVIEW, product);
            }
        );
    
        this._modalView.render({
            content: productPreview.render({
                category: product.category,
                title: product.title,
                image: product.image,
                price: product.price,
                description: product.description,
                button: this._basketModel.isProductInBasket(product) ? 'Удалить' : 'В корзину',
                isAvailable: isEmpty(product.price)
            })
        });
    }

    private changeModal(condition: boolean): void {
        this._pageView.blocked = condition;
    }

    private renderForm(formType: 'delivery' | 'contacts'): void {
        const formView = formType === 'delivery' ? this._deliveryFormView : this._contactsFormView;
        const formData = formType === 'delivery'
            ? { payment: this._orderModel.data.payment, address: this._orderModel.data.address }
            : { email: this._orderModel.data.email, phone: this._orderModel.data.phone };

        this._modalView.render({
            content: formView.render({
                ...formData,
                correct: false,
                errors: ''
            })
        });
    }
}