import { IModel } from "./model";

/**
 * Тип способа оплаты
 */
export type PaymentMethod = 'online' | 'offline';

/**
 * Интерфейс для представления данных заказа
 *
 * @property {PaymentMethod} payment - способ оплаты
 * @property {string} address - адрес доставки
 * @property {string} email - электронная почта
 * @property {string} phone - номер телефона
 */
export interface IOrderData {
    payment: PaymentMethod;
    address: string;
    email: string;
    phone: string;
}

/**
 * Интерфейс для модели заказа
 *
 * @property {PaymentMethod} data.payment - способ оплаты
 * @property {string} data.address - адрес доставки
 * @property {string} data.email - электронная почта
 * @property {string} data.phone - номер телефона
 *
 * @method validatePayment - проверяет валидность способа оплаты
 * @method validateAddress - проверяет валидность адреса доставки
 * @method validateEmail - проверяет валидность электронной почты
 * @method validatePhone - проверяет валидность номера телефона
 */
export interface IOrderModel extends IModel<IOrderData> {
    validatePayment(): boolean;
    validateAddress(): boolean;
    validateEmail(): boolean;
    validatePhone(): boolean;
};
