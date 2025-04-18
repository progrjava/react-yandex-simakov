import { Events } from "../../types/events";
import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/events";
import { View } from "./base/View";

/**
 * Представление хедера страницы
 */
interface IHeaderView {
    counter: number;
}

/**
 * Класс представления хедера страницы
 */
export class HeaderView extends View<IHeaderView> {
    private _basketCounter: HTMLElement;
    private _basketButton: HTMLButtonElement;

    /**
     * Создает экземпляр представления хедера
     * @param {HTMLElement} container - контейнер, в котором будет отображаться представление
     * @param {IEvents} events - объект для работы с событиями
     */
    constructor(container: HTMLElement, events: IEvents) {
        super(container, events);

        this._basketCounter = ensureElement<HTMLElement>('.header__basket-counter', this.container);
        this._basketButton = ensureElement<HTMLButtonElement>('.header__basket', this.container);

        this._basketButton.addEventListener('click', () => {
            events.emit(Events.BASKET_OPEN);
        });
    }

    /**
     * Устанавливает количество товаров в корзине
     * @param {number} data - количество товаров
     */
    set counter(data: number) {
        this.setText(this._basketCounter, data);
    }
}
