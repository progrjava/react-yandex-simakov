import { EventEmitter } from "../components/base/events";
import { OrderModel } from "../components/models/OrderModel";
import { ContactsFormView } from "../components/views/ContactsFormView";
import { DeliveryFormView } from "../components/views/DeliveryFormView";
import { FormErrors, IOrderData, PaymentMethod } from "../types/order";

/**
 * Презентер для управления заказами
 */
export class OrderPresenter {
    /**
     * @param _orderModel - модель заказа
     * @param _deliveryFormView - представление формы доставки
     * @param _contactsFormView - представление формы контактов
     * @param _events - эмиттер событий
     */
    constructor(
        private _orderModel: OrderModel,
        private _deliveryFormView: DeliveryFormView,
        private _contactsFormView: ContactsFormView,
        private _events: EventEmitter
    ) {
        this.subscribe();
    }

    /**
     * Подписывается на события изменения формы и валидации
     */
    private subscribe(): void {
        this._events.on(
            /^(order|contacts):([\w-]+)-change$/, 
            (data: { name: keyof IOrderData, value: string }) => 
                this.changeOrder(data)
        );
        this._events.on(
            /^(delivery|contacts)-form:error$/, 
            (data: { errors: FormErrors, type: string }) => 
                this.changeErrors(data)
        );
        this._events.on(
            /^order:(delivery|contacts)-form-valid$/, 
            (data: {type: string}) => 
                this.formValid(data)
        );
    }

    /**
     * Обрабатывает изменения в данных заказа
     * @param data - объект с именем поля и новым значением
     */
    private changeOrder(data: { name: keyof IOrderData, value: string }): void {
        if (data.name === 'payment') this._orderModel.payment = data.value as PaymentMethod;
        else this._orderModel[data.name] = data.value;
    }

    /**
     * Обрабатывает ошибки валидации формы
     * @param data - объект с ошибками и типом формы
     */
    private changeErrors(data: { errors: FormErrors, type: string }): void {
        const formView = data.type === 'delivery' ? this._deliveryFormView : this._contactsFormView;
        formView.errors = Object.values(data.errors)
            .filter(error => error !== '')
            .join('  ');
        formView.correct = false;
    }

    /**
     * Обрабатывает успешную валидацию формы
     * @param data - объект с типом формы
     */
    private formValid(data: {type: string}): void {
        (data.type === 'delivery' ? this._deliveryFormView : this._contactsFormView).errors = '';
        (data.type === 'delivery' ? this._deliveryFormView : this._contactsFormView).correct = true;
    }
}
