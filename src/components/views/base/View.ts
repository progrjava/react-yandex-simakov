import { ensureElement } from "../../../utils/utils";
import { IEvents } from "../../base/events";

export abstract class View<T> {
    protected constructor(protected readonly container: HTMLElement, protected events: IEvents) {}

    protected toggleClass(
        element: HTMLElement | string,
        className: string,
        condition: boolean
    ): void {
        const el = ensureElement<HTMLElement>(element, this.container);
        el.classList.toggle(className, condition);
    }

    protected setText(
        element: HTMLElement | string,
        value: unknown
    ) : void {
        const el = ensureElement<HTMLElement>(element, this.container);
        el.textContent = String(value);
    }

    protected setImage(
        element: HTMLImageElement | string,
        src: string,
        alt?: string
    ) : void {
        const el = ensureElement<HTMLImageElement>(element, this.container);
        el.src = src;
        el.alt = alt || '';
    }

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

    render(data?: Partial<T>): HTMLElement {
        Object.assign(this as object, data ?? {});
        return this.container;
    }
}