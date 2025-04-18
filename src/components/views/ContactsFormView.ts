import { Events } from "../../types/events";
import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/events";
import { FormView } from "./FormView";

/**
 * Интерфейс данных формы контактов
 */
interface IContactsForm {
    email: string;
    phone: string;
}

/**
 * Класс представления формы контактов
 * @extends FormView<IContactsForm> Наследует базовый класс формы с общими методами
 */
export class ContactsFormView extends FormView<IContactsForm> {
    /**
     * Создает экземпляр представления формы контактов
     * @param {HTMLFormElement} container DOM-элемент формы
     * @param {IEvents} events Объект для работы с событиями
     */
    constructor(container: HTMLFormElement, events: IEvents) {
        super(container, events);

        this.container.addEventListener('submit', (event: Event) => {
            event.preventDefault();
            this.events.emit(Events.ORDER_CONTACTS_FORM_SUBMIT);
        });
    }

    /**
     * Устанавливает значение email в поле ввода
     * @param {string} email Значение email
     */
    set email(email: string) {
        const emailInput = this.container.querySelector<HTMLInputElement>('[name="email"]');
        if (emailInput) emailInput.value = email;
    }

    /**
     * Устанавливает значение телефона в поле ввода
     * @param {string} phone Значение телефона
     */
    set phone(phone: string) {
        const phoneInput = this.container.querySelector<HTMLInputElement>('[name="phone"]');
        if (phoneInput) phoneInput.value = phone;
    }
}