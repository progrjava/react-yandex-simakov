import { FormErrors, IOrderData, IOrderModel, PaymentMethod } from "../../types/order";
import { IEvents } from "../base/events";
import { Events } from "../../types/events";
import { Model } from "./base/Model";
import { isEmpty } from "../../utils/utils";

/**
 * Модель заказа, управляющая данными оформления и их валидацией
 * @extends Model<IOrderData> Базовый класс модели с методами обновления данных
 * @implements IOrderModel Интерфейс модели заказа
 */
export class OrderModel extends Model<IOrderData> implements IOrderModel {
    private _errors: FormErrors;

    /**
     * Создает экземпляр модели заказа
     * @param {IEvents} events Объект для работы с событиями
     */
    constructor(events: IEvents) {
        super({ payment: null, address: '', email: '', phone: '' }, events);
        this._errors = { payment: '', address: '', email: '', phone: '' };
    }

    /**
     * Устанавливает способ оплаты и запускает валидацию формы доставки
     * @param {PaymentMethod | null} payment Выбранный способ оплаты ('online' или 'cash')
     */
    set payment(payment: PaymentMethod | null) {
        this.updateData(data => ({ ...data, payment }));
        this.validateDeliveryForm();
    }

    /**
     * Проверяет корректность выбора способа оплаты
     * @returns {boolean} true если способ оплаты выбран, false если нет
     */
    validatePayment(): boolean {
        if (!isEmpty(this.data.payment)) {
            this._errors.payment = '';
            return true;
        } else {
            this._errors.payment = 'Выберите способ оплаты.';
            return false;
        }
    }

    /**
     * Устанавливает адрес доставки и запускает валидацию формы доставки
     * @param {string} address Адрес доставки
     */
    set address(address: string) {
        this.updateData(data => ({ ...data, address }));
        this.validateDeliveryForm();
    }

    /**
     * Проверяет корректность адреса доставки
     * @returns {boolean} true если адрес не пустой, false если пустой
     */
    validateAddress(): boolean {
        if (this.data.address) {
            this._errors.address = '';
            return true;
        } else {
            this._errors.address = 'Введите адрес доставки.';
            return false;
        };
    }

    /**
     * Устанавливает email и запускает валидацию формы контактов
     * @param {string} email Email покупателя
     */
    set email(email: string) {
        this.updateData(data => ({ ...data, email }));
        this.validateContactsForm();
    }

    /**
     * Проверяет корректность email по регулярному выражению
     * @returns {boolean} true если email валиден, false если нет
     */
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

    /**
     * Устанавливает телефон и запускает валидацию формы контактов
     * @param {string} phone Телефон покупателя
     */
    set phone(phone: string) {
        this.updateData(data => ({ ...data, phone }));
        this.validateContactsForm();
    }

    /**
     * Проверяет корректность телефона по регулярному выражению
     * @returns {boolean} true если телефон валиден, false если нет
     */
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

    /**
     * Валидирует форму доставки (адрес и способ оплаты)
     * Генерирует события:
     * - ORDER_DELIVERY_FORM_VALID при успешной валидации
     * - DELIVERY_FORM_ERROR при наличии ошибок
     */
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

    /**
     * Валидирует форму контактов (email и телефон)
     * Генерирует события:
     * - ORDER_CONTACTS_FORM_VALID при успешной валидации
     * - CONTACTS_FORM_ERROR при наличии ошибок
     */
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
    
    /**
     * Сбрасывает данные заказа и ошибки валидации
     * Генерирует событие ORDER_RESET
     */
    reset(): void {
        this.updateData(() => ({ payment: null, address: '', email: '', phone: '' }));
        this._errors = { payment: '', address: '', email: '', phone: '' };
        this.emitEvent(Events.ORDER_RESET);
    }
}
