import { Events } from "../../types/events";
import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/events";
import { View } from "./base/View";

interface IFormView {
    errors: string,
    correct: boolean
}

export abstract class FormView<T> extends View<IFormView> {
    protected _submitButton: HTMLButtonElement;
    protected _errors: HTMLElement;

    constructor(protected container: HTMLFormElement, events: IEvents) {
        super(container, events);

        this._submitButton = ensureElement<HTMLButtonElement>(
            'button[type="submit"]', 
            this.container
        );
        this._errors = ensureElement<HTMLElement>('.form__errors', this.container);

        this.container.addEventListener('input', (event: Event) => {
            const target = event.target as HTMLInputElement;
            const inputName = target.name as keyof T;
            const value = target.value;
		    this.events.emit(
                `${this.container.name}:${String(inputName)}-change`, 
                { name: inputName, value: value }
            );
        });
    }

    set correct(value: boolean) {
        this.setActivity(this._submitButton, !value);
    }

    set errors(value: string) {
        this.setText(this._errors, value);
    }

    render(formData: Partial<T> & IFormView): HTMLFormElement {
		const formState = {
            correct: formData.correct,
            errors: formData.errors
        };
        
        const inputValues = { ...formData };
        delete inputValues.correct;
        delete inputValues.errors;
    
        super.render(formState);
		Object.assign(this, inputValues);
		return this.container;
    }
}