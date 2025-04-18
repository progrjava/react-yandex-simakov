import { ensureElement, isEmpty } from "../../utils/utils";
import { IEvents } from "../base/events";
import { View } from "./base/View";
import { IProductView } from "./ProductView";

/**
 * Интерфейс представления продукта в корзине
 */
interface IProductInBasketView extends Pick<IProductView, 'title' | 'price'> {
    index: number;
}

/**
 * Класс представления продукта в корзине
 */
export class ProductInBasketView extends View<IProductInBasketView> {
    private _index: HTMLElement;
    private _title: HTMLElement;
    private _price: HTMLElement;
    private _delButton: HTMLButtonElement;

    /**
     * Создает экземпляр представления
     * @param {HTMLElement} container - контейнер, в котором будет отображаться представление
     * @param {IEvents} events - объект для работы с событиями
     * @param {((event: MouseEvent) => void) | undefined} onClick - обработчик клика по кнопке удаления
     */
    constructor(
        container: HTMLElement, 
        events: IEvents, 
        onClick?: (event: MouseEvent) => void) 
    {
        super(container, events);
        this._index = ensureElement<HTMLElement>('.basket__item-index', this.container);
        this._title = ensureElement<HTMLElement>('.card__title', this.container);
        this._price = ensureElement<HTMLElement>('.card__price', this.container);
        this._delButton = ensureElement<HTMLButtonElement>('.card__button', this.container);

        this._delButton.addEventListener('click', onClick);
    }

    /**
     * Устанавливает номер продукта
     * @param {number} value - номер
     */
    set index(value: number) {
        this.setText(this._index, value + 1);
    }

    /**
     * Устанавливает название продукта
     * @param {string} value - название
     */
    set title(value: string) {
        this.setText(this._title, value);
    }

    /**
     * Устанавливает цену продукта
     * @param {number} value - цена
     */
    set price(value: number) {    
        this.setText(this._price, isEmpty(value) ? 'Бесценно' : `${value} синапсов`);
    }
}

