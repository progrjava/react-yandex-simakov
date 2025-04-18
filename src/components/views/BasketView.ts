import { Events } from "../../types/events";
import { createElement, ensureElement } from "../../utils/utils";
import { IEvents } from "../base/events";
import { View } from "./base/View";

interface IBasketView {
    products: HTMLElement[];
    total: number,
    enabled: boolean
}

export class BasketView extends View<IBasketView> {
    private _products: HTMLElement;
    private _total: HTMLElement;
    private _nextButton: HTMLButtonElement;

    constructor(container: HTMLElement, events: IEvents) {
        super(container, events); 

        this._products = ensureElement<HTMLElement>('.basket__list', this.container);
        this._total = ensureElement<HTMLElement>('.basket__price', this.container);
        this._nextButton = ensureElement<HTMLButtonElement>('.basket__button', this.container);

        if (this._nextButton) {
            this._nextButton.addEventListener('click', () => {
                events.emit(Events.ORDER_DELIVERY_FORM_OPEN);
            });
        }

        this.products = [];
    }

    set products(products: HTMLElement[]) {
        if (products.length > 0) {
            this._products.replaceChildren(...products);
        }
        else {
            this._products.replaceChildren(createElement<HTMLParagraphElement>('p', {textContent: 'Ужас! Ваша корзина пуста!'}));
        }
    }

    set total(total: number | null) {
         this.setText(this._total, total === null ? 'Бесценно' : `${total} синапсов`); 
    }

    set enabled(value: boolean) {
        this.setActivity(this._nextButton, !value);
    }
}