import { ensureElement } from "../../../utils/utils";
import { IEvents } from "../../base/events";

export abstract class View<T> {
    /**
     * @constructor
     * @param {HTMLElement} container - контейнер, в котором будет отображаться View
     * @param {IEvents} events - объект событий
     */
    protected constructor(protected readonly container: HTMLElement, protected events: IEvents) {}

    /**
     * Добавляет/удаляет класс к element, если condition == true
     * @param {HTMLElement | string} element - элемент, к которому добавлять/удалять класс
     * @param {string} className - имя класса
     * @param {boolean} condition - условие
     */
    protected toggleClass(
        element: HTMLElement | string,
        className: string,
        condition: boolean
    ): void {
        const el = ensureElement<HTMLElement>(element, this.container);
        el.classList.toggle(className, condition);
    }

    /**
     * Устанавливает текстовое содержимое element
     * @param {HTMLElement | string} element - элемент, текст которого будет установлен
     * @param {unknown} value - значение, которое будет преобразовано к строке
     */
    protected setText(
        element: HTMLElement | string,
        value: unknown
    ) : void {
        const el = ensureElement<HTMLElement>(element, this.container);
        el.textContent = String(value);
    }

    /**
     * Устанавливает src и alt для image
     * @param {HTMLImageElement | string} element - элемент, чей src будет установлен
     * @param {string} src - URL-адрес изображения
     * @param {string} [alt] - alt-атрибут, если он не указан, то будет пустой
     */
    protected setImage(
        element: HTMLImageElement | string,
        src: string,
        alt?: string
    ) : void {
        const el = ensureElement<HTMLImageElement>(element, this.container);
        el.src = src;
        el.alt = alt || '';
    }

    /**
     * Устанавливает disabled-атрибут element, если condition == true
     * @param {HTMLElement} element - элемент, activity которого будет изменен
     * @param {boolean} condition - условие
     */
    protected setActivity(
        element: HTMLElement,
        condition: boolean
    ) : void {
        if (element) {
            if (condition) {
                element.setAttribute('disabled', 'disabled');
            } else {
                element.removeAttribute('disabled');
            }
        }
    }

    /**
     * Рендерит View
     * @param {Partial<T>} [data] - данные, которые будут установлены в View
     * @returns {HTMLElement} - контейнер View
     */
    render(data?: Partial<T>): HTMLElement {
        Object.assign(this as object, data ?? {});
        return this.container;
    }
}
