import { Events } from "../../types/events";
import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/events";
import { View } from "./base/View";

interface IModalView {
    content: HTMLElement;
}

export class ModalView extends View<IModalView> {
    private _content: HTMLElement;
    private _closeButton: HTMLButtonElement;

    constructor(container: HTMLElement, events: IEvents) {
        super(container, events);

        this._content = ensureElement<HTMLElement>('.modal__content', container);
        this._closeButton = ensureElement<HTMLButtonElement>('.modal__close', container);

        [this._closeButton, this.container].forEach(el => {
            el.addEventListener('click', () => this.closeModal());
        });

        this._content.addEventListener('click', (event) => event.stopPropagation());
    }

    set content(value: HTMLElement) {
        this._content.replaceChildren(value);
    }

    closeModal(): void {
        this.toggleClass(this.container, 'modal_active', false);
        this.content = null;
        this.events.emit(Events.MODAL_CLOSE);
    }

    openModal(): void {
        this.toggleClass(this.container, 'modal_active', true);
        this.events.emit(Events.MODAL_OPEN);
    }

    render(data?: Partial<IModalView>): HTMLElement {
        super.render(data);
        this.openModal();
        return this.container;
    }
}