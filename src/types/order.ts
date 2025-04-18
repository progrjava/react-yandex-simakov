/**
 * Тип способа оплаты
 */
export type PaymentMethod = 'card' | 'cash';

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
 * Интерфейс для представления полных данных заказа
 *
 * @property {string[]} items - массив id товаров
 * @property {number} total - общая стоимость заказа
 */
export interface IOrderFullData extends IOrderData {
    items: string[];
    total: number;
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
 * @method validatePayment - проверяет валидность способа оплаты
 * @method validateAddress - проверяет валидность адреса доставки
 * @method validateEmail - проверяет валидность электронной почты
 * @method validatePhone - проверяет валидность номера телефона
 * @method validateDeliveryForm - проверяет валидность формы доставки
 * @method validateContactsForm - проверяет валидность формы контактов
 * @method reset - сбрасывает данные форм
 */
export interface IOrderModel {
    validatePayment(): boolean;
    validateAddress(): boolean;
    validateEmail(): boolean;
    validatePhone(): boolean;
    validateDeliveryForm(): void;
    validateContactsForm(): void;
    reset(): void;
};
