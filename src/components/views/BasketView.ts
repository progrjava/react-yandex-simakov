import { Events } from "../../types/events";
import { createElement, ensureElement } from "../../utils/utils";
import { IEvents } from "../base/events";
import { View } from "./base/View";

/**
 * Интерфейс для данных отображения корзины
 */
interface IBasketView {
    products: HTMLElement[];  // Массив элементов товаров
    total: number;            // Общая сумма заказа
    enabled: boolean;         // Флаг доступности кнопки оформления
}

/**
 * Класс представления корзины товаров
 * @extends View<IBasketView> Базовый класс представления с общими методами
 */
export class BasketView extends View<IBasketView> {
    private _products: HTMLElement;          // Контейнер для списка товаров
    private _total: HTMLElement;            // Элемент для отображения общей суммы
    private _nextButton: HTMLButtonElement;  // Кнопка перехода к оформлению

    /**
     * Создает экземпляр представления корзины
     * @param {HTMLElement} container Родительский контейнер
     * @param {IEvents} events Объект для работы с событиями
     */
    constructor(container: HTMLElement, events: IEvents) {
        super(container, events); 

        // Инициализация элементов DOM
        this._products = ensureElement<HTMLElement>('.basket__list', this.container);
        this._total = ensureElement<HTMLElement>('.basket__price', this.container);
        this._nextButton = ensureElement<HTMLButtonElement>('.basket__button', this.container);

        // Обработчик клика по кнопке оформления
        if (this._nextButton) {
            this._nextButton.addEventListener('click', () => {
                events.emit(Events.ORDER_DELIVERY_FORM_OPEN);
            });
        }

        this.products = [];  // Инициализация пустого списка товаров
    }

    /**
     * Устанавливает список товаров в корзине
     * @param {HTMLElement[]} products Массив элементов товаров
     */
    set products(products: HTMLElement[]) {
        if (products.length > 0) {
            this._products.replaceChildren(...products);  // Обновление списка
        }
        else {
            // Отображение сообщения о пустой корзине
            this._products.replaceChildren(
                createElement<HTMLParagraphElement>('p', {
                    textContent: 'Ужас! Ваша корзина пуста!'
                })
            );
        }
    }

    /**
     * Устанавливает общую сумму заказа
     * @param {number | null} total Сумма (null для бесплатных товаров)
     */
    set total(total: number | null) {
         this.setText(this._total, total === null ? 'Бесценно' : `${total} синапсов`); 
    }

    /**
     * Управляет состоянием кнопки оформления
     * @param {boolean} value Доступность кнопки (true - активна)
     */
    set enabled(value: boolean) {
        this.setActivity(this._nextButton, !value);  // Инверсия для disabled состояния
    }
}