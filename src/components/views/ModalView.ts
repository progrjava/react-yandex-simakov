import { Events } from "../../types/events";
import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/events";
import { View } from "./base/View";

/**
 * Интерфейс представления модального окна
 */
interface IModalView {
    content: HTMLElement;
}

/**
 * Представление модального окна
 *
 * @property {HTMLElement} content
 */
export class ModalView extends View<IModalView> {
    private _content: HTMLElement;
    private _closeButton: HTMLButtonElement;

    /**
     * @param {HTMLElement} container контейнер представления
     * @param {IEvents} events объект для работы с событиями
     */
    constructor(container: HTMLElement, events: IEvents) {
        super(container, events);

        this._content = ensureElement<HTMLElement>('.modal__content', container);
        this._closeButton = ensureElement<HTMLButtonElement>('.modal__close', container);

        [this._closeButton, this.container].forEach(el => {
            el.addEventListener('click', () => this.closeModal());
        });

        this._content.addEventListener('click', (event) => event.stopPropagation());
    }

    /**
     * Установка контента модального окна
     *
     * @param {HTMLElement} value
     */
    set content(value: HTMLElement) {
        this._content.replaceChildren(value);
    }

    /**
     * Закрытие модального окна
     */
    closeModal(): void {
        this.toggleClass(this.container, 'modal_active', false);
        this.content = null;
        this.events.emit(Events.MODAL_CLOSE);
    }

    /**
     * Открытие модального окна
     */
    openModal(): void {
        this.toggleClass(this.container, 'modal_active', true);
        this.events.emit(Events.MODAL_OPEN);
    }

    /**
     * Рендер представления
     *
     * @param {Partial<IModalView>} [data] данные для рендера
     * @returns {HTMLElement} контейнер представления
     */
    render(data?: Partial<IModalView>): HTMLElement {
        super.render(data);
        this.openModal();
        return this.container;
    }
}
