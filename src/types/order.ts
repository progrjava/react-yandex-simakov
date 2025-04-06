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
    payment: PaymentMethod | null;
    address: string;
    email: string;
    phone: string;
}

/**
 * Тип для ошибок валидации полей формы заказа
 *
 * @property {string} payment - ошибка валидации способа оплаты
 * @property {string} address - ошибка валидации адреса доставки
 * @property {string} email - ошибка валидации электронной почты
 * @property {string} phone - ошибка валидации номера телефона
 */
export type FormErrors = {
    [K in keyof IOrderData]: K extends 'payment' ? string : string;
};

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
export interface IOrderModel {
    validatePayment(): void;
    validateAddress(): void;
    validateEmail(): void;
    validatePhone(): void;
};
