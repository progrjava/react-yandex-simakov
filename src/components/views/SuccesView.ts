import { ensureElement, isEmpty } from "../../utils/utils";
import { IEvents } from "../base/events";
import { View } from "./base/View";

/**
 * Интерфейс представления успешного заказа
 */
interface ISuccesView {
    sum: number;
}

/**
 * Класс представления успешного заказа
 */
export class SuccesView extends View<ISuccesView> {
    private _sum: HTMLElement;
    private _successButton: HTMLButtonElement;

    /**
     * Создает экземпляр представления успешного заказа
     * @param {HTMLElement} container контейнер, в котором будет отображаться представление
     * @param {IEvents} events объект для работы с событиями
     * @param {function} [onClick] функция, которая будет вызвана при клике на кнопку
     */
    constructor(container: HTMLElement, events: IEvents, onClick?: (event: MouseEvent) => void) {
        super(container, events);

        this._sum = ensureElement<HTMLElement>('.order-success__description', this.container);
        this._successButton = ensureElement<HTMLButtonElement>('.order-success__close', this.container);

        if (onClick) this._successButton.addEventListener('click', onClick);
    }

    /**
     * Устанавливает сумму заказа
     * @param {number | null} sum сумма заказа
     */
    set sum(sum: number | null) {
        this.setText(this._sum, `Списано ${isEmpty(sum) ? 'Бесценно' : sum} синапсов`);
    }
}
