import { Category, IProduct } from "../../types/product";
import { CATEGORIES } from "../../utils/constants";
import { ensureElement, isEmpty } from "../../utils/utils";
import { IEvents } from "../base/events";
import { View } from "./base/View";

/**
 * Интерфейс представления продукта
 */
export interface IProductView {
    category: string;
    title: string;
    description?: string;
    image: string;
    price: number | null;
    button?: string;
    isAvailable?: boolean;
}

/**
 * Класс представления продукта
 */
export class ProductView extends View<IProductView> {
    private _title: HTMLElement;
    private _description?: HTMLElement;
    private _price?: HTMLElement;
    private _image?: HTMLImageElement;
    private _category: HTMLElement;
    private _button?: HTMLButtonElement;

    /**
     * Создает экземпляр представления продукта
     * @param {string} wrapper - класс обертки элемента
     * @param {HTMLElement} container - контейнер, в котором будет отображаться представление
     * @param {IEvents} events - объект для работы с событиями
     * @param {(event: MouseEvent) => void} [onClick] - обработчик события клика
     */
    constructor(
        protected wrapper: string, 
        container: HTMLElement,
        events: IEvents,
        onClick?: (event: MouseEvent) => void) 
    {
        super(container, events);
        this._category = ensureElement<HTMLElement>(`.${wrapper}__category`, container);
        this._title = ensureElement<HTMLElement>(`.${wrapper}__title`, container);
        this._description = container.querySelector(`.${wrapper}__text`);
        this._price = container.querySelector(`.${wrapper}__price`);
        this._image = ensureElement<HTMLImageElement>(`.${wrapper}__image`, container);
        this._button = container.querySelector(`.${wrapper}__button`);

        if (onClick) {
            if (!this._button) container.addEventListener('click', onClick);
            else this._button.addEventListener('click', onClick);
        }
    }

    /**
     * Устанавливает название продукта
     * @param {string} value - название
     */
    set title(value: string) {
        this.setText(this._title, value);
    }

    /**
     * Устанавливает описание продукта
     * @param {string} value - описание
     */
    set description(value: string) {
        this.setText(this._description, value);
    }

    /**
     * Устанавливает доступность продукта
     * @param {boolean} value - флаг доступности
     */
    set isAvailable(value: boolean) {
        this.setActivity(this._button, value);
    }

    /**
     * Устанавливает цену продукта
     * @param {number | null} value - цена
     */
    set price(value: number | null) {
        this.setText(this._price, isEmpty(value) ? 'Бесценно' : `${value} синапсов`);
    }

    /**
     * Устанавливает изображение продукта
     * @param {string} value - URL изображения
     */
    set image(value: string) {
        this.setImage(this._image, value);
    }

    /**
     * Устанавливает категорию продукта
     * @param {Category} value - категория
     */
    set category(value: Category) {
        this.setText(this._category, value);
        this._category.className = '';
        const mainClass = `${this.wrapper}__category`;
        this._category.classList.add(mainClass, `${mainClass}_${CATEGORIES[value]}`);
    }

    /**
     * Устанавливает текст кнопки
     * @param {string} value - текст кнопки
     */
    set button(value: string) {
        this.setText(this._button, value);
    }
}

