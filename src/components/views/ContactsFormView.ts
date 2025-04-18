import { Events } from "../../types/events";
import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/events";
import { FormView } from "./FormView";

interface IContactsForm {
    email: string;
    phone: string;
}

export class ContactsFormView extends FormView<IContactsForm> {

    constructor(container: HTMLFormElement, events: IEvents) {
        super(container, events);

        this.container.addEventListener('submit', (event: Event) => {
            event.preventDefault();
            this.events.emit(Events.ORDER_CONTACTS_FORM_SUBMIT);
        });
    }

    set email(email: string) {
        const emailInput = this.container.querySelector<HTMLInputElement>('[name="email"]');
        if (emailInput) emailInput.value = email;
    }

    set phone(phone: string) {
        const phoneInput = this.container.querySelector<HTMLInputElement>('[name="phone"]');
        if (phoneInput) phoneInput.value = phone;
    }
}