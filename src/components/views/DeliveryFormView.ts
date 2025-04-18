import { Events } from "../../types/events";
import { PaymentMethod } from "../../types/order";
import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/events";
import { FormView } from "./FormView";

/**
 * Интерфейс данных формы доставки
 */
interface IDeliveryForm {
    payment: PaymentMethod;
    address: string;
}

/**
 * Класс представления формы доставки
 * @extends FormView<IDeliveryForm> Наследует базовый класс формы с общими методами
 */
export class DeliveryFormView extends FormView<IDeliveryForm> {
    private _paymentWrapper: HTMLDivElement;
    private _paymentButtons: HTMLButtonElement[];

    /**
     * Создает экземпляр представления формы доставки
     * @param {HTMLFormElement} container DOM-элемент формы
     * @param {IEvents} events Объект для работы с событиями
     */
    constructor(container: HTMLFormElement, events: IEvents) {
        super(container, events);

        this._paymentWrapper = ensureElement<HTMLDivElement>('.order__buttons', this.container);
        this._paymentButtons = Array.from(this._paymentWrapper.querySelectorAll('.button_alt')) as HTMLButtonElement[];

        this._paymentWrapper.addEventListener('click', (event: MouseEvent) => {
            const className = (event.target as HTMLButtonElement).name;
            this.choosePayment(className);
            events.emit(Events.ORDER_PAYMENT_CHANGE, {name: 'payment', value: className as PaymentMethod });
        });

        this.container.addEventListener('submit', (event: Event) => {
            event.preventDefault();
            events.emit(Events.ORDER_DELIVERY_FORM_SUBMIT);
        });
    }

    /**
     * Устанавливает выбранный способ оплаты
     * @param {PaymentMethod} payment Способ оплаты ('online' или 'cash')
     */
    set payment(payment: PaymentMethod) {
        this.choosePayment(payment as string);
    }

    /**
     * Устанавливает адрес доставки
     * @param {string} address Адрес доставки
     */
    set address(address: string) {
        (this.container.elements.namedItem('address') as HTMLInputElement).value = address;
    }

    /**
     * Выбирает способ оплаты и обновляет UI
     * @param {string} payment Название способа оплаты
     */
    choosePayment(payment: string) {
        this._paymentButtons.forEach(button => {
            if (button.name === payment) this.toggleClass(button, 'button_alt-active', true);
            else this.toggleClass(button, 'button_alt-active', false);
        });
    }

    /**
     * Сбрасывает выбор способа оплаты
     */
    clearPayment() {
        this._paymentButtons.forEach(button => {
            this.toggleClass(button, 'button_alt-active', false);
        });
    }
}