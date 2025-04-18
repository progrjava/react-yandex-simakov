import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/events";
import { View } from "./base/View";

interface IPageView {
    gallery: HTMLElement[];
    blocked: boolean;
}

export class PageView extends View<IPageView> {
    private _gallery: HTMLElement;
    private _wrapper: HTMLElement;

    constructor(container: HTMLElement, events: IEvents) {
        super(container, events);
        this._gallery = ensureElement<HTMLElement>('.gallery', this.container);
        this._wrapper = ensureElement<HTMLElement>('.page__wrapper');

    }

    set gallery(items: HTMLElement[]) {
        this._gallery.replaceChildren(...items);
    }

    set blocked(value: boolean) {
		this.toggleClass(this._wrapper, 'page__wrapper_locked', value);
	}
}
