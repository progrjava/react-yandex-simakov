import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/events";
import { View } from "./base/View";

/**
 * Интерфейс представления страницы
 */
interface IPageView {
    gallery: HTMLElement[];
    blocked: boolean;
}

/**
 * Представление страницы
 */
export class PageView extends View<IPageView> {
    private _gallery: HTMLElement;
    private _wrapper: HTMLElement;

    /**
     * @param {HTMLElement} container - контейнер, в котором будет отображаться представление
     * @param {IEvents} events - объект для работы с событиями
     */
    constructor(container: HTMLElement, events: IEvents) {
        super(container, events);
        this._gallery = ensureElement<HTMLElement>('.gallery', this.container);
        this._wrapper = ensureElement<HTMLElement>('.page__wrapper');

    }

    /**
     * Устанавливает элементы галереи
     * @param {HTMLElement[]} items - элементы
     */
    set gallery(items: HTMLElement[]) {
        this._gallery.replaceChildren(...items);
    }

    /**
     * Блокирует/разблокирует страницу
     * @param {boolean} value - true - блокировка, false - разблокировка
     */
    set blocked(value: boolean) {
		this.toggleClass(this._wrapper, 'page__wrapper_locked', value);
	}
}
