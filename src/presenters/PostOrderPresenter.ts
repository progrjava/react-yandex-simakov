import { EventEmitter } from "../components/base/events";
import { BasketModel } from "../components/models/BasketModel";
import { OrderModel } from "../components/models/OrderModel";
import { ModalView } from "../components/views/ModalView";
import { Events } from "../types/events";
import { IOrderFullData } from "../types/order";
import { Api } from "../components/base/api";
import { SuccesView } from "../components/views/SuccesView";
import { cloneTemplate } from "../utils/utils";

export class PostOrderPresenter {
    /**
     * @class
     * @classdesc Presenter для отправки заказа на сервер
     * @param {HTMLTemplateElement} _successTemplate - template для success-окна
     * @param {BasketModel} _basketModel - модель корзины
     * @param {OrderModel} _orderModel - модель заказа
     * @param {ModalView} _modalView - представление модального окна
     * @param {EventEmitter} _events - эмиттер событий
     * @param {Api} _api - API для отправки заказа
     * @constructor
     */
    constructor(
        private _successTemplate: HTMLTemplateElement,
        private _basketModel: BasketModel,
        private _orderModel: OrderModel,
        private _modalView: ModalView,
        private _events: EventEmitter,
        private _api: Api,
    ) {
        this.subscribe();
    }

    /**
     * @method
     * @description подписывается на событие отправки формы контактов
     */
    private subscribe(): void {
        this._events.on(Events.ORDER_CONTACTS_FORM_SUBMIT, () => this.postOrder());
    }

    /**
     * @method
     * @description отправляет заказ на сервер
     */
    private postOrder(): void {
        const items = this._basketModel.data.items.map(item => item.id);
        const total = this._basketModel.data.total;
        const { payment, address, email, phone } = this._orderModel.data;
        const fullOrderData: IOrderFullData = { items, payment, address, email, phone, total };
    
        const response = this._api.post('/order', fullOrderData);

        if (response) {
            response.then(() => {
                const success = new SuccesView(
                    cloneTemplate(this._successTemplate),
                    this._events,
                    () => this._modalView.closeModal()
                );
    
                this._modalView.render({
                    content: success.render({
                        sum: this._basketModel.data.total
                    })
                });
    
                this._basketModel.clear();
                this._orderModel.reset();
            });
        }
    }
}
