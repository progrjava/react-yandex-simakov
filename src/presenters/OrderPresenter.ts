import { EventEmitter } from "../components/base/events";
import { OrderModel } from "../components/models/OrderModel";
import { ContactsFormView } from "../components/views/ContactsFormView";
import { DeliveryFormView } from "../components/views/DeliveryFormView";
import { FormErrors, IOrderData, PaymentMethod } from "../types/order";

export class OrderPresenter {
    constructor(
        private _orderModel: OrderModel,
        private _deliveryFormView: DeliveryFormView,
        private _contactsFormView: ContactsFormView,
        private _events: EventEmitter
    ) {
        this.subscribe();
    }

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

    private changeOrder(data: { name: keyof IOrderData, value: string }): void {
        if (data.name === 'payment') this._orderModel.payment = data.value as PaymentMethod;
        else this._orderModel[data.name] = data.value;
    }

    private changeErrors(data: { errors: FormErrors, type: string }): void {
        const formView = data.type === 'delivery' ? this._deliveryFormView : this._contactsFormView;
        formView.errors = Object.values(data.errors)
            .filter(error => error !== '')
            .join('  ');
        formView.correct = false;
    }

    private formValid(data: {type: string}): void {
        (data.type === 'delivery' ? this._deliveryFormView : this._contactsFormView).errors = '';
        (data.type === 'delivery' ? this._deliveryFormView : this._contactsFormView).correct = true;
    }
}