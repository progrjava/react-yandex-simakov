/**
 * Тип модального окна
 */
export type ModalType =
    | 'product'
    | 'basket'
    | 'delivery'
    | 'contacts'
    | 'success';

/**
 * Интерфейс для хранения состояния приложения
 *
 * @property {ModalType | null} activeModal - тип активного модального окна
 * @property {string[]} validationErrors - список ошибок валидации форм
 */
export interface IAppState {
    activeModal: ModalType | null;
    validationErrors: string[];
}

/**
 * Интерфейс для модели состояния приложения
 *
 * @property {ModalType | null} data.activeModal - тип активного модального окна
 * @property {string[]} data.validationErrors - список ошибок валидации форм
 *
 * @method openModal - открыть модальное окно
 * @param {ModalType} modal - тип модального окна
 * @method closeModal - закрыть модальное окно
 * @method setValidationErrors - установить список ошибок валидации форм
 * @param {string[]} errors - список ошибок
 */
export interface IAppStateModel {
    openModal(modal: ModalType): void;
    closeModal(): void;
    setValidationErrors(errors: string[]): void;
}
