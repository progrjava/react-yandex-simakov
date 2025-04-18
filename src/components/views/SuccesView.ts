import { Events } from "../../types/events";
import { ensureElement, isEmpty } from "../../utils/utils";
import { IEvents } from "../base/events";
import { View } from "./base/View";

interface ISuccesView {
    sum: number;
}

export class SuccesView extends View<ISuccesView> {
    private _sum: HTMLElement;
    private _successButton: HTMLButtonElement;

    constructor(container: HTMLElement, events: IEvents, onClick?: (event: MouseEvent) => void) {
        super(container, events);

        this._sum = ensureElement<HTMLElement>('.order-success__description', this.container);
        this._successButton = ensureElement<HTMLButtonElement>('.order-success__close', this.container);

        if (onClick) this._successButton.addEventListener('click', onClick);
    }

    set sum(sum: number | null) {
        this.setText(this._sum, `Списано ${isEmpty(sum) ? 'Бесценно' : sum} синапсов`);
    }
}