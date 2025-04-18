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
    /**
     * Презентер для работы с модальным окном
     * @param _productPreviewTemplate - шаблон для отображения товара
     * @param _basketModel - модель корзины
     * @param _orderModel - модель заказа
     * @param _basketView - представление корзины
     * @param _pageView - представление страницы
     * @param _modalView - представление модального окна
     * @param _contactsFormView - представление формы контактов
     * @param _deliveryFormView - представление формы доставки
     * @param _events - объект для работы с событиями
     */
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

    /**
     * Подписывается на события
     */
    private subscribe(): void {
        this._events.on(Events.BASKET_OPEN, () => this.openBasket());
        this._events.on(Events.PRODUCT_PREVIEW, (product: IProduct) => this.showProductPreview(product));
        this._events.on(Events.MODAL_CLOSE, () => this.changeModal(false));
        this._events.on(Events.MODAL_OPEN, () => this.changeModal(true));
        this._events.on(Events.ORDER_DELIVERY_FORM_OPEN, () => this.renderForm('delivery'));
        this._events.on(Events.ORDER_DELIVERY_FORM_SUBMIT, () => this.renderForm('contacts'));
    }

    /**
     * Открывает корзину
     */
    private openBasket(): void {
        this._modalView.render({
            content: this._basketView.render({enabled: this._basketModel.getLength() > 0})
        });
    }

    /**
     * Отображает товар
     * @param product - товар
     */
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

    /**
     * Блокирует/разблокирует страницу
     * @param condition - флаг, который указывает, блокировать страницу или нет
     */
    private changeModal(condition: boolean): void {
        this._pageView.blocked = condition;
    }

    /**
     * Рендерит форму
     * @param formType - тип формы ('delivery' - форма доставки, 'contacts' - форма контактов)
     */
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
