import { Events } from "../../types/events";
import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/events";
import { View } from "./base/View";

/**
 * Интерфейс состояния формы
 */
interface IFormView {
    errors: string,
    correct: boolean
}

/**
 * Абстрактный класс базовой формы
 * @template T - Тип данных формы
 * @extends View<IFormView> - Наследует базовое представление
 */
export abstract class FormView<T> extends View<IFormView> {
    protected _submitButton: HTMLButtonElement;
    protected _errors: HTMLElement;

    /**
     * Создает экземпляр базовой формы
     * @param {HTMLFormElement} container - DOM-элемент формы
     * @param {IEvents} events - Объект для работы с событиями
     */
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

    /**
     * Устанавливает состояние доступности кнопки отправки
     * @param {boolean} value - Флаг корректности формы (true - форма валидна)
     */
    set correct(value: boolean) {
        this.setActivity(this._submitButton, !value);
    }

    /**
     * Устанавливает текст ошибок валидации
     * @param {string} value - Текст ошибки
     */
    set errors(value: string) {
        this.setText(this._errors, value);
    }

    /**
     * Рендерит форму с переданными данными
     * @param {Partial<T> & IFormView} formData - Данные формы и состояние
     * @returns {HTMLFormElement} DOM-элемент формы
     */
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