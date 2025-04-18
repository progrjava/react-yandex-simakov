import { FormErrors, IOrderData, IOrderModel, PaymentMethod } from "../../types/order";
import { IEvents } from "../base/events";
import { Events } from "../../types/events";
import { Model } from "./base/Model";
import { isEmpty } from "../../utils/utils";

export class OrderModel extends Model<IOrderData> implements IOrderModel {
    private _errors: FormErrors;

    constructor(events: IEvents) {
        super({ payment: null, address: '', email: '', phone: '' }, events);
        this._errors = { payment: '', address: '', email: '', phone: '' };
    }

    
    set payment(payment: PaymentMethod | null) {
        this.updateData(data => ({ ...data, payment }));
        this.validateDeliveryForm();
    }

    validatePayment(): boolean {
        if (!isEmpty(this.data.payment)) {
            this._errors.payment = '';
            return true;
        } else {
            this._errors.payment = 'Выберите способ оплаты.';
            return false;
        }
    }

    set address(address: string) {
        this.updateData(data => ({ ...data, address }));
        this.validateDeliveryForm();
    }

    validateAddress(): boolean {
        if (this.data.address) {
            this._errors.address = '';
            return true;
        } else {
            this._errors.address = 'Введите адрес доставки.';
            return false;
        };
    }

    set email(email: string) {
        this.updateData(data => ({ ...data, email }));
        this.validateContactsForm();
    }

    validateEmail(): boolean {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if (emailRegex.test(this.data.email)) {
            this._errors.email = '';
            return true;
        } else {
            this._errors.email = 'Введите корректную электронную почту.';
            return false;
        }
    }

    set phone(phone: string) {
        this.updateData(data => ({ ...data, phone }));
        this.validateContactsForm();
    }

    validatePhone(): boolean {
        const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
        if (phoneRegex.test(this.data.phone)) {
            this._errors.phone = '';
            return true;
        } else {
            this._errors.phone = 'Введите корректный номер телефона.';
            return false;
        }
    }

    validateDeliveryForm(): void {
        const isPaymentValid = this.validatePayment();
        const isAddressValid = this.validateAddress();
    
        if(isAddressValid && isPaymentValid) {
            this.emitEvent(Events.ORDER_DELIVERY_FORM_VALID, { type: 'delivery' });
        } else {
            this.emitEvent(
                Events.DELIVERY_FORM_ERROR, 
                { errors: { 
                    payment: this._errors.payment, 
                    address: this._errors.address 
                },
                type: 'delivery'
            });
        }
    }

    validateContactsForm(): void {
        const isEmailValid = this.validateEmail();
        const isPhoneValid = this.validatePhone();

        if(isEmailValid && isPhoneValid) {
            this.emitEvent(Events.ORDER_CONTACTS_FORM_VALID, { type: 'contacts' });
        } else {
            this.emitEvent(
                Events.CONTACTS_FORM_ERROR, 
                { errors: { 
                    email: this._errors.email, 
                    phone: this._errors.phone 
                },
                type: 'contacts'
            });
        }
    }
    
    reset(): void {
        this.updateData(() => ({ payment: null, address: '', email: '', phone: '' }));
        this._errors = { payment: '', address: '', email: '', phone: '' };
        this.emitEvent(Events.ORDER_RESET);
    }
}