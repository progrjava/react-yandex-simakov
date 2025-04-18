import { Events } from "../../types/events";
import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/events";
import { View } from "./base/View";

interface IHeaderView {
    counter: number;
}

export class HeaderView extends View<IHeaderView> {
    private _basketCounter: HTMLElement;
    private _basketButton: HTMLButtonElement;

    constructor(container: HTMLElement, events: IEvents) {
        super(container, events);

        this._basketCounter = ensureElement<HTMLElement>('.header__basket-counter', this.container);
        this._basketButton = ensureElement<HTMLButtonElement>('.header__basket', this.container);

        this._basketButton.addEventListener('click', () => {
            events.emit(Events.BASKET_OPEN);
        });
    }

    set counter(data: number) {
        this.setText(this._basketCounter, data);
    }
}